interface IUserRequest {
    name: string;
    email: string;
    password?: string;
}

interface IUserResponse extends IUserRequest {
    id: string;
}

interface IUserSessionRequest {
    email: string;
    password: string;
}

interface ISimpleResponse {
    message: string;
}

export { IUserRequest, IUserResponse, IUserSessionRequest, ISimpleResponse };
