/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateAdminDto {
  /** @example "João Silva" */
  name: string;
  /**
   * @format email
   * @example "admin@borracharia.com"
   */
  email: string;
  /**
   * @minLength 6
   * @example "senha123"
   */
  password: string;
}

export interface Admin {
  /**
   * ID único do administrador
   * @example "uuid-v4"
   */
  id: string;
  /**
   * Nome do administrador
   * @example "João Silva"
   */
  name: string;
  /**
   * Email do administrador
   * @example "admin@borracharia.com"
   */
  email: string;
  /**
   * Senha criptografada
   * @example "senha123"
   */
  password: string;
  borracharia: Borracharia;
  borrachariaId: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Pneu {
  /**
   * ID único do pneu
   * @example "uuid-v4"
   */
  id: string;
  /**
   * Modelo do pneu
   * @example "Primacy 4"
   */
  model?: string;
  /**
   * Aro do pneu (13, 14, 15, 16...)
   * @example 16
   */
  rim: number;
  /**
   * Tamanho/Dimensões (Largura/Perfil)
   * @example "205/55"
   */
  size: string;
  /**
   * Tipo do pneu
   * @example "novo"
   */
  type: PneuTypeEnum;
  /**
   * Quantidade em estoque
   * @example 10
   */
  quantity: number;
  /**
   * Preço de custo do pneu
   * @example 450
   */
  price: number;
  borracharia: Borracharia;
  borrachariaId: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Servico {
  /**
   * ID único do serviço
   * @example "uuid-v4"
   */
  id: string;
  /**
   * Nome do serviço
   * @example "Alinhamento e Balanceamento"
   */
  name: string;
  /**
   * Descrição detalhada
   * @example "Serviço completo de geometria"
   */
  description: string;
  borracharia: Borracharia;
  borrachariaId: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface OrderItem {
  /**
   * ID do item do pedido
   * @example "uuid-v4"
   */
  id: string;
  /** Pneu vendido (se houver) */
  pneu?: Pneu;
  /** Serviço prestado (se houver) */
  servico?: Servico;
  /**
   * Quantidade do item
   * @example 2
   */
  quantity: number;
  /**
   * Preço unitário no momento da venda
   * @example 450
   */
  unitPrice: number;
  /**
   * Subtotal (Qtd * Preço)
   * @example 900
   */
  subTotal: number;
  pedido: Pedido;
  pedidoId: string;
  pneuId: string;
  servicoId: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Garantia {
  /**
   * ID da garantia
   * @example "uuid-v4"
   */
  id: string;
  /** Pedido coberto pela garantia */
  pedido: Pedido;
  /**
   * Placa do carro
   * @example "ABC-1234"
   */
  carPlate: string;
  /**
   * Quilometragem do veículo na instalação
   * @example 50000
   */
  mileage: number;
  /**
   * Termos da garantia
   * @example "12 meses ou 10.000km"
   */
  terms: string;
  pedidoId: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Pedido {
  /**
   * ID do pedido
   * @example "uuid-v4"
   */
  id: string;
  /** Cliente que fez o pedido */
  cliente: Cliente;
  /** Itens do pedido */
  itens: OrderItem[];
  /**
   * Indica se o pedido possui garantia
   * @example true
   */
  hasWarranty: boolean;
  /** Dados da garantia */
  garantia?: Garantia;
  /**
   * Valor total do pedido
   * @example 1500
   */
  total: number;
  borracharia: Borracharia;
  borrachariaId: string;
  clienteId: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Cliente {
  /**
   * ID único do cliente
   * @example "uuid-v4"
   */
  id: string;
  /**
   * Nome do cliente
   * @example "Maria Souza"
   */
  name: string;
  /**
   * Telefone do cliente
   * @example "11999999999"
   */
  phone: string;
  /**
   * Email do cliente
   * @example "maria@email.com"
   */
  email?: string;
  borracharia: Borracharia;
  borrachariaId: string;
  pedidos: Pedido[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Borracharia {
  /**
   * ID da borracharia
   * @example "uuid-v4"
   */
  id: string;
  /**
   * Nome da borracharia
   * @example "Borracharia do Zé"
   */
  name: string;
  /**
   * Endereço da borracharia
   * @example "Rua das Flores, 123"
   */
  address: string;
  admins: Admin[];
  pneus: Pneu[];
  servicos: Servico[];
  clientes: Cliente[];
  pedidos: Pedido[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface UpdateAdminDto {
  /** @example "João Silva" */
  name?: string;
  /**
   * @format email
   * @example "admin@borracharia.com"
   */
  email?: string;
  /**
   * @minLength 6
   * @example "senha123"
   */
  password?: string;
}

export interface CreateClienteDto {
  /** @example "Maria Souza" */
  name: string;
  /** @example "11999999999" */
  phone: string;
  /**
   * @format email
   * @example "maria@email.com"
   */
  email?: string;
}

export interface UpdateClienteDto {
  /** @example "Maria Souza" */
  name?: string;
  /** @example "11999999999" */
  phone?: string;
  /**
   * @format email
   * @example "maria@email.com"
   */
  email?: string;
}

export interface CreatePneuDto {
  /** @example "Primacy 4" */
  model?: string;
  /** @example 16 */
  rim: CreatePneuDtoRimEnum;
  /** @example "205/55R16" */
  size: CreatePneuDtoSizeEnum;
  /** @example "novo" */
  type: CreatePneuDtoTypeEnum;
  /**
   * @min 0
   * @example 10
   */
  quantity: number;
  /**
   * Preço de custo do pneu
   * @min 0
   * @example 450
   */
  price: number;
}

export interface UpdatePneuDto {
  /** @example "Primacy 4" */
  model?: string;
  /** @example 16 */
  rim?: UpdatePneuDtoRimEnum;
  /** @example "205/55R16" */
  size?: UpdatePneuDtoSizeEnum;
  /** @example "novo" */
  type?: UpdatePneuDtoTypeEnum;
  /**
   * @min 0
   * @example 10
   */
  quantity?: number;
  /**
   * Preço de custo do pneu
   * @min 0
   * @example 450
   */
  price?: number;
}

export interface CreateServicoDto {
  /** @example "Alinhamento" */
  name: string;
  /** @example "Descrição opcional" */
  description?: string;
}

export interface UpdateServicoDto {
  /** @example "Alinhamento" */
  name?: string;
  /** @example "Descrição opcional" */
  description?: string;
}

export interface CreateOrderItemDto {
  /**
   * @format uuid
   * @example "uuid-pneu"
   */
  pneuId?: string;
  /**
   * @format uuid
   * @example "uuid-servico"
   */
  servicoId?: string;
  /**
   * Preço unitário de venda no momento do pedido
   * @min 0
   * @example 450
   */
  unitPrice: number;
  /**
   * @min 1
   * @example 1
   */
  quantity: number;
}

export interface CreateGarantiaPedidoDto {
  /** @example "ABC-1234" */
  carPlate: string;
  /**
   * @min 0
   * @example 50000
   */
  mileage: number;
  /** @example "12 meses" */
  terms: string;
}

export interface CreatePedidoDto {
  /** @example "Cliente Novo" */
  clientName: string;
  /** @example "11988887777" */
  clientPhone: string;
  /**
   * @format email
   * @example "cliente@email.com"
   */
  clientEmail?: string;
  items: CreateOrderItemDto[];
  /** @example true */
  hasWarranty?: boolean;
  garantia?: CreateGarantiaPedidoDto;
}

export interface CreateGarantiaDto {
  /**
   * ID do pedido
   * @format uuid
   * @example "uuid-pedido"
   */
  pedidoId: string;
  /** @example "ABC-1234" */
  carPlate: string;
  /**
   * @min 0
   * @example 50000
   */
  mileage: number;
  /** @example "12 meses" */
  terms: string;
}

export interface UpdateGarantiaDto {
  /**
   * ID do pedido
   * @format uuid
   * @example "uuid-pedido"
   */
  pedidoId?: string;
  /** @example "ABC-1234" */
  carPlate?: string;
  /**
   * @min 0
   * @example 50000
   */
  mileage?: number;
  /** @example "12 meses" */
  terms?: string;
}

export interface CreateBorrachariaDto {
  /** @example "Borracharia do Zé" */
  name: string;
  /** @example "Rua das Flores, 123" */
  address?: string;
  /** Dados do administrador inicial */
  admin: CreateAdminDto;
}

export interface LoginDto {
  /**
   * @format email
   * @example "ze@borracharia.com"
   */
  email: string;
  /** @example "senha123" */
  password: string;
}

/**
 * Tipo do pneu
 * @example "novo"
 */
export enum PneuTypeEnum {
  Novo = "novo",
  Usado = "usado",
  Remold = "remold",
}

/** @example 16 */
export enum CreatePneuDtoRimEnum {
  Value13 = 13,
  Value14 = 14,
  Value15 = 15,
  Value16 = 16,
}

/** @example "205/55R16" */
export enum CreatePneuDtoSizeEnum {
  Value15570R13 = "155/70R13",
  Value15580R13 = "155/80R13",
  Value16570R13 = "165/70R13",
  Value17570R13 = "175/70R13",
  Value17565R13 = "175/65R13",
  Value18560R13 = "185/60R13",
  Value18570R13 = "185/70R13",
  Value21550R13 = "215/50R13",
  Value16570R14 = "165/70R14",
  Value17565R14 = "175/65R14",
  Value17570R14 = "175/70R14",
  Value17580R14 = "175/80R14",
  Value18560R14 = "185/60R14",
  Value18565R14 = "185/65R14",
  Value18570R14 = "185/70R14",
  Value19560R14 = "195/60R14",
  Value17565R15 = "175/65R15",
  Value18555R15 = "185/55R15",
  Value18560R15 = "185/60R15",
  Value18565R15 = "185/65R15",
  Value19550R15 = "195/50R15",
  Value19555R15 = "195/55R15",
  Value19560R15 = "195/60R15",
  Value19565R15 = "195/65R15",
  Value20555R15 = "205/55R15",
  Value20560R15 = "205/60R15",
  Value20565R15 = "205/65R15",
  Value20570R15 = "205/70R15",
  Value21565R15 = "215/65R15",
  Value22550R15 = "225/50R15",
  Value23575R15 = "235/75R15",
  Value17560R16 = "175/60R16",
  Value18555R16 = "185/55R16",
  Value18560R16 = "185/60R16",
  Value19545R16 = "195/45R16",
  Value19550R16 = "195/50R16",
  Value19555R16 = "195/55R16",
  Value19560R16 = "195/60R16",
  Value20555R16 = "205/55R16",
  Value20560R16 = "205/60R16",
  Value20565R16 = "205/65R16",
  Value21555R16 = "215/55R16",
  Value21560R16 = "215/60R16",
  Value21565R16 = "215/65R16",
  Value22550R16 = "225/50R16",
  Value22560R16 = "225/60R16",
  Value23570R16 = "235/70R16",
  Value24575R16 = "245/75R16",
}

/** @example "novo" */
export enum CreatePneuDtoTypeEnum {
  Novo = "novo",
  Usado = "usado",
  Remold = "remold",
}

/** @example 16 */
export enum UpdatePneuDtoRimEnum {
  Value13 = 13,
  Value14 = 14,
  Value15 = 15,
  Value16 = 16,
}

/** @example "205/55R16" */
export enum UpdatePneuDtoSizeEnum {
  Value15570R13 = "155/70R13",
  Value15580R13 = "155/80R13",
  Value16570R13 = "165/70R13",
  Value17570R13 = "175/70R13",
  Value17565R13 = "175/65R13",
  Value18560R13 = "185/60R13",
  Value18570R13 = "185/70R13",
  Value21550R13 = "215/50R13",
  Value16570R14 = "165/70R14",
  Value17565R14 = "175/65R14",
  Value17570R14 = "175/70R14",
  Value17580R14 = "175/80R14",
  Value18560R14 = "185/60R14",
  Value18565R14 = "185/65R14",
  Value18570R14 = "185/70R14",
  Value19560R14 = "195/60R14",
  Value17565R15 = "175/65R15",
  Value18555R15 = "185/55R15",
  Value18560R15 = "185/60R15",
  Value18565R15 = "185/65R15",
  Value19550R15 = "195/50R15",
  Value19555R15 = "195/55R15",
  Value19560R15 = "195/60R15",
  Value19565R15 = "195/65R15",
  Value20555R15 = "205/55R15",
  Value20560R15 = "205/60R15",
  Value20565R15 = "205/65R15",
  Value20570R15 = "205/70R15",
  Value21565R15 = "215/65R15",
  Value22550R15 = "225/50R15",
  Value23575R15 = "235/75R15",
  Value17560R16 = "175/60R16",
  Value18555R16 = "185/55R16",
  Value18560R16 = "185/60R16",
  Value19545R16 = "195/45R16",
  Value19550R16 = "195/50R16",
  Value19555R16 = "195/55R16",
  Value19560R16 = "195/60R16",
  Value20555R16 = "205/55R16",
  Value20560R16 = "205/60R16",
  Value20565R16 = "205/65R16",
  Value21555R16 = "215/55R16",
  Value21560R16 = "215/60R16",
  Value21565R16 = "215/65R16",
  Value22550R16 = "225/50R16",
  Value22560R16 = "225/60R16",
  Value23570R16 = "235/70R16",
  Value24575R16 = "245/75R16",
}

/** @example "novo" */
export enum UpdatePneuDtoTypeEnum {
  Novo = "novo",
  Usado = "usado",
  Remold = "remold",
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<
  D extends unknown,
  E extends unknown = unknown,
> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title API Borracharia
 * @version 1.0
 * @contact
 *
 * Sistema de gerenciamento de borracharia: Estoque, Vendas e Garantias
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  admin = {
    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerCreate
     * @summary Criar novo administrador
     * @request POST:/admin
     */
    adminControllerCreate: (data: CreateAdminDto, params: RequestParams = {}) =>
      this.request<Admin, any>({
        path: `/admin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerFindAll
     * @summary Listar todos os administradores
     * @request GET:/admin
     */
    adminControllerFindAll: (params: RequestParams = {}) =>
      this.request<Admin[], any>({
        path: `/admin`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerFindOne
     * @summary Buscar administrador por ID
     * @request GET:/admin/{id}
     */
    adminControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Admin, any>({
        path: `/admin/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerUpdate
     * @summary Atualizar administrador
     * @request PATCH:/admin/{id}
     */
    adminControllerUpdate: (
      id: string,
      data: UpdateAdminDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/admin/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminControllerRemove
     * @summary Remover administrador
     * @request DELETE:/admin/{id}
     */
    adminControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/admin/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  clientes = {
    /**
     * No description
     *
     * @tags Clientes
     * @name ClientesControllerCreate
     * @summary Criar novo cliente
     * @request POST:/clientes
     */
    clientesControllerCreate: (
      data: CreateClienteDto,
      params: RequestParams = {},
    ) =>
      this.request<Cliente, any>({
        path: `/clientes`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clientes
     * @name ClientesControllerFindAll
     * @summary Listar ou buscar clientes (por nome ou telefone)
     * @request GET:/clientes
     */
    clientesControllerFindAll: (
      query?: {
        /** Termo de busca (nome ou telefone) */
        q?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Cliente[], any>({
        path: `/clientes`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clientes
     * @name ClientesControllerFindOne
     * @summary Buscar cliente por ID
     * @request GET:/clientes/{id}
     */
    clientesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Cliente, any>({
        path: `/clientes/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clientes
     * @name ClientesControllerUpdate
     * @summary Atualizar cliente
     * @request PATCH:/clientes/{id}
     */
    clientesControllerUpdate: (
      id: string,
      data: UpdateClienteDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/clientes/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Clientes
     * @name ClientesControllerRemove
     * @summary Remover cliente
     * @request DELETE:/clientes/{id}
     */
    clientesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/clientes/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  pneus = {
    /**
     * No description
     *
     * @tags Pneus
     * @name PneusControllerCreate
     * @summary Cadastrar novo pneu no estoque
     * @request POST:/pneus
     * @secure
     */
    pneusControllerCreate: (data: CreatePneuDto, params: RequestParams = {}) =>
      this.request<Pneu, any>({
        path: `/pneus`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Pneus
     * @name PneusControllerFindAll
     * @summary Listar estoque de pneus da sua borracharia
     * @request GET:/pneus
     * @secure
     */
    pneusControllerFindAll: (params: RequestParams = {}) =>
      this.request<Pneu[], any>({
        path: `/pneus`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Pneus
     * @name PneusControllerFindOne
     * @summary Buscar pneu por ID
     * @request GET:/pneus/{id}
     * @secure
     */
    pneusControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Pneu, any>({
        path: `/pneus/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Pneus
     * @name PneusControllerUpdate
     * @summary Atualizar dados do pneu
     * @request PATCH:/pneus/{id}
     * @secure
     */
    pneusControllerUpdate: (
      id: string,
      data: UpdatePneuDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/pneus/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Pneus
     * @name PneusControllerRemove
     * @summary Remover pneu do estoque
     * @request DELETE:/pneus/{id}
     * @secure
     */
    pneusControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/pneus/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  servicos = {
    /**
     * No description
     *
     * @tags Serviços
     * @name ServicosControllerCreate
     * @summary Cadastrar novo serviço
     * @request POST:/servicos
     * @secure
     */
    servicosControllerCreate: (
      data: CreateServicoDto,
      params: RequestParams = {},
    ) =>
      this.request<Servico, any>({
        path: `/servicos`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Serviços
     * @name ServicosControllerFindAll
     * @summary Listar serviços disponíveis da sua borracharia
     * @request GET:/servicos
     * @secure
     */
    servicosControllerFindAll: (params: RequestParams = {}) =>
      this.request<Servico[], any>({
        path: `/servicos`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Serviços
     * @name ServicosControllerFindOne
     * @summary Buscar serviço por ID
     * @request GET:/servicos/{id}
     * @secure
     */
    servicosControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Servico, any>({
        path: `/servicos/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Serviços
     * @name ServicosControllerUpdate
     * @summary Atualizar serviço
     * @request PATCH:/servicos/{id}
     * @secure
     */
    servicosControllerUpdate: (
      id: string,
      data: UpdateServicoDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/servicos/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Serviços
     * @name ServicosControllerRemove
     * @summary Remover serviço
     * @request DELETE:/servicos/{id}
     * @secure
     */
    servicosControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/servicos/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  pedidos = {
    /**
     * No description
     *
     * @tags Pedidos
     * @name PedidosControllerCreate
     * @summary Criar novo pedido (Venda)
     * @request POST:/pedidos
     * @secure
     */
    pedidosControllerCreate: (
      data: CreatePedidoDto,
      params: RequestParams = {},
    ) =>
      this.request<Pedido, any>({
        path: `/pedidos`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Pedidos
     * @name PedidosControllerFindAll
     * @summary Listar todos os pedidos da borracharia com filtro de data
     * @request GET:/pedidos
     * @secure
     */
    pedidosControllerFindAll: (
      query?: {
        /**
         * Data inicial
         * @example "2023-10-01"
         */
        startDate?: string;
        /**
         * Data final
         * @example "2023-10-31"
         */
        endDate?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Pedido[], any>({
        path: `/pedidos`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Pedidos
     * @name PedidosControllerFindOne
     * @summary Buscar pedido por ID
     * @request GET:/pedidos/{id}
     * @secure
     */
    pedidosControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/pedidos/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  garantia = {
    /**
     * No description
     *
     * @tags Garantia
     * @name GarantiaControllerCreate
     * @summary Emitir garantia para um pedido
     * @request POST:/garantia
     */
    garantiaControllerCreate: (
      data: CreateGarantiaDto,
      params: RequestParams = {},
    ) =>
      this.request<Garantia, any>({
        path: `/garantia`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Garantia
     * @name GarantiaControllerFindAll
     * @summary Listar todas as garantias
     * @request GET:/garantia
     */
    garantiaControllerFindAll: (params: RequestParams = {}) =>
      this.request<Garantia[], any>({
        path: `/garantia`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Garantia
     * @name GarantiaControllerFindOne
     * @summary Buscar garantia por ID
     * @request GET:/garantia/{id}
     */
    garantiaControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Garantia, any>({
        path: `/garantia/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Garantia
     * @name GarantiaControllerUpdate
     * @summary Atualizar dados da garantia
     * @request PATCH:/garantia/{id}
     */
    garantiaControllerUpdate: (
      id: string,
      data: UpdateGarantiaDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/garantia/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Garantia
     * @name GarantiaControllerRemove
     * @summary Cancelar garantia
     * @request DELETE:/garantia/{id}
     */
    garantiaControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/garantia/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  borracharias = {
    /**
     * No description
     *
     * @tags Borracharias (Multi-tenant)
     * @name BorrachariasControllerCreate
     * @summary Cadastrar nova Borracharia + Admin Inicial
     * @request POST:/borracharias
     */
    borrachariasControllerCreate: (
      data: CreateBorrachariaDto,
      params: RequestParams = {},
    ) =>
      this.request<Borracharia, any>({
        path: `/borracharias`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Borracharias (Multi-tenant)
     * @name BorrachariasControllerFindAll
     * @summary Listar todas as borracharias (Super Admin)
     * @request GET:/borracharias
     */
    borrachariasControllerFindAll: (params: RequestParams = {}) =>
      this.request<Borracharia[], any>({
        path: `/borracharias`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Borracharias (Multi-tenant)
     * @name BorrachariasControllerFindOne
     * @summary Detalhes de uma borracharia
     * @request GET:/borracharias/{id}
     */
    borrachariasControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/borracharias/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * @description **Fluxo Web (Browser):** - A resposta define automaticamente um cookie `access_token` (HttpOnly, Secure). - O frontend não precisa manipular o token manualmente, o browser o envia nas próximas requisições. **Fluxo Mobile / Outros Clientes:** - A resposta retorna o token no corpo JSON: `{ "access_token": "..." }`. - O cliente deve armazenar o token e enviá-lo no header: `Authorization: Bearer <token>`.
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @summary Autenticação Híbrida (Web & Mobile)
     * @request POST:/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description **Fluxo Web (Browser):** - Este endpoint limpa o cookie `access_token` do navegador. **Fluxo Mobile:** - O cliente deve apenas descartar o token armazenado localmente (não é necessário chamar este endpoint, pois não mantemos estado no servidor).
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @summary Logout do sistema
     * @request POST:/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/logout`,
        method: "POST",
        ...params,
      }),
  };
}
