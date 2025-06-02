// services/ConsumoService.js
const API_BASE_URL = 'http://localhost:8080/api';

class ConsumoService {
  constructor() {
    this.baseConfig = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  async makeRequest(url, options = {}) {
    try {
      console.log(`Fazendo requisição para: ${url}`);
      const response = await fetch(url, {
        ...this.baseConfig,
        ...options,
      });

      const textResponse = await response.text();
      console.log('Resposta bruta:', textResponse);

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${textResponse}`);
      }

      try {
        return textResponse ? JSON.parse(textResponse) : {};
      } catch (e) {
        console.error('Erro ao parsear JSON:', e);
        throw new Error('Resposta do servidor não é um JSON válido');
      }
    } catch (error) {
      console.error(`Erro na requisição para ${url}:`, error);
      throw error;
    }
  }

  // Método para buscar consumo atual (tempo real)
  async getCurrentConsumo() {
    return this.makeRequest(`${API_BASE_URL}/consumo/atual`);
  }

  // Alias para getCurrentConsumo (mantém compatibilidade)
  async getConsumoAtual() {
    return this.getCurrentConsumo();
  }

  // Método para buscar consumo detalhado
  async getConsumoDetalhado() {
    return this.makeRequest(`${API_BASE_URL}/consumo/detalhado`);
  }

  // Método para buscar histórico de consumo
  async getConsumoHistorico(startDate, endDate) {
    const params = new URLSearchParams({
      start: startDate,
      end: endDate,
    });

    return this.makeRequest(`${API_BASE_URL}/consumo/historico?${params}`);
  }

  async getTotalConsumo(startDate, endDate) {
    const params = new URLSearchParams({
      start: startDate,
      end: endDate,
    });

    return this.makeRequest(`${API_BASE_URL}/consumo/total?${params}`);
  }

  async getMediaConsumo(startDate, endDate) {
    const params = new URLSearchParams({
      start: startDate,
      end: endDate,
    });

    return this.makeRequest(`${API_BASE_URL}/consumo/media?${params}`);
  }

  // Método para buscar custo do período
  async getCustoPeriodo(startDate, endDate) {
    const params = new URLSearchParams({
      start: startDate,
      end: endDate,
    });

    return this.makeRequest(`${API_BASE_URL}/consumo/custo?${params}`);
  }

  // Método para buscar resumo diário
  async getResumoDiario() {
    return this.makeRequest(`${API_BASE_URL}/consumo/resumo-diario`);
  }

  // Método para buscar resumo semanal
  async getResumoSemanal() {
    return this.makeRequest(`${API_BASE_URL}/consumo/resumo-semanal`);
  }

  async getDashboardData(startDate, endDate) {
    try {
      const [current, historico, total, media, custo] = await Promise.all([
        this.getCurrentConsumo(),
        this.getConsumoHistorico(startDate, endDate),
        this.getTotalConsumo(startDate, endDate),
        this.getMediaConsumo(startDate, endDate),
        this.getCustoPeriodo(startDate, endDate),
      ]);

      return {
        current,
        historico,
        total,
        media,
        custo,
      };
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
      throw error;
    }
  }

  // Método para obter range de datas baseado no intervalo selecionado
  getDateRange(interval) {
    const now = new Date();
    let startDate;

    switch (interval) {
      case '7 Dias':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '1 Mês':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'Dia':
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
    }

    return {
      startDate: startDate.toISOString(),
      endDate: now.toISOString(),
    };
  }

  // Método estático mantido para compatibilidade
  static getIntervaloDatas(intervalo) {
    const agora = new Date();
    let dataInicio;

    switch (intervalo) {
      case '7 Dias':
        dataInicio = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '1 Mês':
        dataInicio = new Date(agora.getFullYear(), agora.getMonth() - 1, agora.getDate());
        break;
      case 'Dia':
      default:
        dataInicio = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
        break;
    }

    return {
      startDate: dataInicio.toISOString(),
      endDate: agora.toISOString(),
    };
  }

  // Método estático para acessar instância
  static getDashboardData(startDate, endDate) {
    return consumoService.getDashboardData(startDate, endDate);
  }

  static getDateRange(interval) {
    return consumoService.getDateRange(interval);
  }

  // Método para formatar dados de consumo
  formatConsumoData(data) {
    if (!Array.isArray(data)) {
      console.warn('Dados de consumo não são um array:', data);
      return [];
    }

    return data.map(item => ({
      ...item,
      memoryUsageMb: item.memoryUsageBytes ? parseFloat((item.memoryUsageBytes / (1024 * 1024)).toFixed(1)) : 0,
      timestamp: new Date(item.timestamp).toISOString(),
    }));
  }

  // Método estático mantido para compatibilidade
  static formatarDadosConsumo(data) {
    if (!Array.isArray(data)) {
      console.warn('Dados de consumo não são um array:', data);
      return [];
    }

    return data.map(item => ({
      ...item,
      memoryUsageMb: item.memoryUsageBytes ? parseFloat((item.memoryUsageBytes / (1024 * 1024)).toFixed(1)) : 0,
      timestamp: new Date(item.timestamp).toISOString(),
    }));
  }
}

const consumoService = new ConsumoService();

export default consumoService;