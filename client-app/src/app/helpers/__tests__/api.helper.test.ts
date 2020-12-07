import { ApiCallMethod, createApiCall } from '../api.helper';

type MyData = {
  name: string;
  age: number;
};

type MyDataRequest = {
  filterByName?: string;
  ageLimit?: number;
};

type MyDataBody = {
  fieldOne: string;
  fieldTwo: number;
};

const fetchMock = jest.fn() as jest.Mock<Promise<Response>>;

global.fetch = fetchMock;

describe('api helper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch url without data, payload and body', async () => {
    // Arrange
    fetchMock.mockResolvedValue({
      ...new Response(),
      ok: true,
    });

    // Act
    const fetchMyData = createApiCall({ url: 'my-test-url' });
    const { data } = await fetchMyData({});

    // Assert
    expect(fetchMock).toHaveBeenCalledWith('my-test-url', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(data).toEqual({});
  });

  test('should fetch url with specified method', async () => {
    // Arrange
    const method: ApiCallMethod = 'POST';
    fetchMock.mockResolvedValue({
      ...new Response(),
      ok: true,
    });

    // Act
    const fetchMyData = createApiCall({ url: 'my-test-url', method });
    const { data } = await fetchMyData({});

    // Assert
    expect(fetchMock).toHaveBeenCalledWith('my-test-url', {
      method,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(data).toEqual({});
  });

  test('should receive json from server if fetchJson parameter is specified', async () => {
    // Arrange
    const receivedData: MyData = {
      name: 'John',
      age: 26,
    };
    const jsonMock = jest.fn().mockResolvedValue(receivedData);
    fetchMock.mockResolvedValue({
      ...new Response(),
      ok: true,
      json: jsonMock,
    });

    // Act
    const fetchMyData = createApiCall<MyData>({
      url: 'my-test-url',
      fetchJson: true,
    });
    const { data } = await fetchMyData({});

    // Assert
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(data).toEqual(receivedData);
  });

  test('should fetch data and modify url if url modifier function is specified', async () => {
    // Arrange
    const initialUrl = 'my-test-url';
    const modifiedUrl = 'my-test-url (modified)';
    const modifyUrl = jest.fn().mockReturnValue(modifiedUrl);
    const payload: MyDataRequest = {
      filterByName: 'test',
      ageLimit: 20,
    };

    // Act
    const fetchMyData = createApiCall<MyData, MyDataRequest>({
      url: initialUrl,
      modifyUrl,
    });
    await fetchMyData(payload);

    // Assert
    expect(modifyUrl).toHaveBeenCalledWith(initialUrl, payload);
    expect(fetchMock).toHaveBeenCalledWith(modifiedUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  });

  test('should fetch data with json stringified body', async () => {
    // Arrange
    const body: MyDataBody = {
      fieldOne: 'test',
      fieldTwo: 123,
    };

    // Act
    const fetchMyData = createApiCall({ url: 'my-test-url', body });
    await fetchMyData({});

    // Assert
    expect(fetchMock).toHaveBeenCalledWith('my-test-url', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  });
});
