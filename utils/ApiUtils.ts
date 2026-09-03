import { expect, type APIRequestContext } from '@playwright/test';

export interface LoginPayload {
  userEmail: string;
  userPassword: string;
}

export interface OrderPayload {
  orders: Array<{
    country: string;
    productOrderedId: string;
  }>;
}

interface LoginResponse {
  token?: string;
}

interface CreateOrderResponse {
  orders?: string[];
}

interface Product {
  _id?: string;
  productName?: string;
}

interface ProductListResponse {
  data?: Product[];
}

export interface CreatedOrder {
  token: string;
  orderId: string;
}

export class ApiUtils {
  constructor(
    private readonly apiContext: APIRequestContext,
    private readonly loginPayload: LoginPayload
  ) {}

  async getToken(): Promise<string> {
    const response = await this.apiContext.post('/api/ecom/auth/login', {
      data: this.loginPayload
    });

    expect(response.ok(), await response.text()).toBeTruthy();
    const body = (await response.json()) as LoginResponse;

    if (!body.token) {
      throw new Error('Login response did not contain an authentication token');
    }

    return body.token;
  }

  async getProductIdByName(
    productName: string,
    authenticationToken?: string
  ): Promise<string> {
    const token = authenticationToken ?? (await this.getToken());
    const response = await this.apiContext.post(
      '/api/ecom/product/get-all-products',
      {
        data: {
          productName: '',
          minPrice: null,
          maxPrice: null,
          productCategory: [],
          productSubCategory: [],
          productFor: []
        },
        headers: { Authorization: token }
      }
    );

    expect(response.ok(), await response.text()).toBeTruthy();
    const body = (await response.json()) as ProductListResponse;
    const product = body.data?.find(
      item =>
        item.productName?.trim().toLowerCase() ===
        productName.trim().toLowerCase()
    );

    if (!product?._id) {
      throw new Error(`Product "${productName}" was not found in the catalog`);
    }

    return product._id;
  }

  async createOrder(
    orderPayload: OrderPayload,
    authenticationToken?: string
  ): Promise<CreatedOrder> {
    const token = authenticationToken ?? (await this.getToken());
    const response = await this.apiContext.post('/api/ecom/order/create-order', {
      data: orderPayload,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });

    expect(response.ok(), await response.text()).toBeTruthy();
    const body = (await response.json()) as CreateOrderResponse;
    const orderId = body.orders?.[0];

    if (!orderId) {
      throw new Error('Create-order response did not contain an order ID');
    }

    return { token, orderId };
  }

  async createOrderForProduct(
    productName: string,
    country: string
  ): Promise<CreatedOrder> {
    const token = await this.getToken();
    const productOrderedId = await this.getProductIdByName(productName, token);

    return this.createOrder(
      { orders: [{ country, productOrderedId }] },
      token
    );
  }
}
