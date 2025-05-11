package com.nrgcontrol.energy_monitoring.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final JwtService jwtService;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager, JwtService jwtService) {
        super(authenticationManager);
        this.jwtService = jwtService;
        setFilterProcessesUrl("/api/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        try {
            String username;
            String password;

            // Check the Content-Type of the request
            String contentType = request.getContentType() != null ? request.getContentType().toLowerCase() : "";

            if (contentType.contains("application/json")) {
                // Parse JSON body
                Map<String, String> loginData = objectMapper.readValue(request.getInputStream(), new com.fasterxml.jackson.core.type.TypeReference<Map<String, String>>() {});
                username = loginData.get("username");
                password = loginData.get("password");
            } else if (contentType.contains("application/x-www-form-urlencoded")) {
                // Parse form-encoded body
                username = request.getParameter("username");
                password = request.getParameter("password");
            } else {
                throw new RuntimeException("Unsupported Content-Type: " + contentType);
            }

            if (username == null || password == null) {
                throw new RuntimeException("Missing username or password");
            }

            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
            setDetails(request, authRequest);
            return this.getAuthenticationManager().authenticate(authRequest);
        } catch (IOException e) {
            throw new RuntimeException("Falha ao processar requisição de autenticação", e);
        }
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult
    ) throws IOException, ServletException {
        // Pegar detalhes do usuário autenticado
        UserDetails user = (UserDetails) authResult.getPrincipal();
        
        // Gerar token JWT
        String token = jwtService.generateToken(user);
        
        // Criar resposta JSON
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("token", token);
        responseBody.put("username", user.getUsername());
        
        // Adicionar o token ao cabeçalho da resposta
        response.setHeader("Authorization", "Bearer " + token);
        
        // Configurar a resposta
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);
        
        // Escrever resposta JSON
        objectMapper.writeValue(response.getOutputStream(), responseBody);
    }

    @Override
    protected void unsuccessfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException failed
    ) throws IOException, ServletException {
        // Criar resposta de erro
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Falha na autenticação");
        errorResponse.put("message", failed.getMessage());
        
        // Configurar a resposta
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        
        // Escrever resposta JSON
        objectMapper.writeValue(response.getOutputStream(), errorResponse);
    }
}