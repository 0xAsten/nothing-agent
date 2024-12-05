/* tslint:disable */
/* eslint-disable */
export enum ErrorCode {
  StarknetFailedToReceiveTransaction = 1,
  StarknetContractNotFound = 20,
  StarknetBlockNotFound = 24,
  StarknetInvalidTransactionIndex = 27,
  StarknetClassHashNotFound = 28,
  StarknetTransactionHashNotFound = 29,
  StarknetPageSizeTooBig = 31,
  StarknetNoBlocks = 32,
  StarknetInvalidContinuationToken = 33,
  StarknetTooManyKeysInFilter = 34,
  StarknetContractError = 40,
  StarknetTransactionExecutionError = 41,
  StarknetClassAlreadyDeclared = 51,
  StarknetInvalidTransactionNonce = 52,
  StarknetInsufficientMaxFee = 53,
  StarknetInsufficientAccountBalance = 54,
  StarknetValidationFailure = 55,
  StarknetCompilationFailed = 56,
  StarknetContractClassSizeIsTooLarge = 57,
  StarknetNonAccount = 58,
  StarknetDuplicateTx = 59,
  StarknetCompiledClassHashMismatch = 60,
  StarknetUnsupportedTxVersion = 61,
  StarknetUnsupportedContractClassVersion = 62,
  StarknetUnexpectedError = 63,
  StarknetNoTraceAvailable = 10,
  SignError = 101,
  StorageError = 102,
  AccountFactoryError = 103,
  PaymasterExecutionTimeNotReached = 104,
  PaymasterExecutionTimePassed = 105,
  PaymasterInvalidCaller = 106,
  PaymasterRateLimitExceeded = 107,
  PaymasterNotSupported = 108,
  PaymasterHttp = 109,
  PaymasterExcecution = 110,
  PaymasterSerialization = 111,
  CartridgeControllerNotDeployed = 112,
  InsufficientBalance = 113,
  OriginError = 114,
  EncodingError = 115,
  SerdeWasmBindgenError = 116,
  CairoSerdeError = 117,
  CairoShortStringToFeltError = 118,
  DeviceCreateCredential = 119,
  DeviceGetAssertion = 120,
  DeviceBadAssertion = 121,
  DeviceChannel = 122,
  DeviceOrigin = 123,
  AccountSigning = 124,
  AccountProvider = 125,
  AccountClassHashCalculation = 126,
  AccountClassCompression = 127,
  AccountFeeOutOfRange = 128,
  ProviderRateLimited = 129,
  ProviderArrayLengthMismatch = 130,
  ProviderOther = 131,
  SessionAlreadyRegistered = 132,
  UrlParseError = 133,
  Base64DecodeError = 134,
  CoseError = 135,
  PolicyChainIdMismatch = 136,
}
export interface CallPolicy {
    target: string;
    method: string;
}

export interface TypedDataPolicy {
    scope_hash: string;
}

export type Policy = CallPolicy | TypedDataPolicy;

export interface WebauthnSigner {
    rpId: string;
    credentialId: string;
    publicKey: string;
}

export interface StarknetSigner {
    privateKey: JsFelt;
}

export interface Signer {
    webauthn?: WebauthnSigner;
    starknet?: StarknetSigner;
}

export interface SessionMetadata {
    session: Session;
    maxFee: Felt | null;
    credentials: Credentials | null;
    isRegistered: boolean;
}

export interface Session {
    policies: Policy[];
    expiresAt: number;
}

export interface Credentials {
    authorization: Felt[];
    privateKey: Felt;
}

export interface JsCall {
    contractAddress: Felt;
    entrypoint: string;
    calldata: Felt[];
}

export interface JsEstimateFeeDetails {
    nonce: Felt;
}

export interface JsInvocationsDetails {
    maxFee: Felt;
}

export type Felts = JsFelt[];

export type JsFelt = Felt;

export class CartridgeSessionAccount {
  free(): void;
  /**
   * @param {string} rpc_url
   * @param {JsFelt} signer
   * @param {JsFelt} address
   * @param {JsFelt} chain_id
   * @param {(JsFelt)[]} session_authorization
   * @param {Session} session
   * @returns {CartridgeSessionAccount}
   */
  static new(rpc_url: string, signer: JsFelt, address: JsFelt, chain_id: JsFelt, session_authorization: (JsFelt)[], session: Session): CartridgeSessionAccount;
  /**
   * @param {string} rpc_url
   * @param {JsFelt} signer
   * @param {JsFelt} address
   * @param {JsFelt} owner_guid
   * @param {JsFelt} chain_id
   * @param {Session} session
   * @returns {CartridgeSessionAccount}
   */
  static new_as_registered(rpc_url: string, signer: JsFelt, address: JsFelt, owner_guid: JsFelt, chain_id: JsFelt, session: Session): CartridgeSessionAccount;
  /**
   * @param {JsFelt} hash
   * @param {(JsCall)[]} calls
   * @returns {Promise<Felts>}
   */
  sign(hash: JsFelt, calls: (JsCall)[]): Promise<Felts>;
  /**
   * @param {(JsCall)[]} calls
   * @param {JsFelt} max_fee
   * @returns {Promise<Felts>}
   */
  sign_transaction(calls: (JsCall)[], max_fee: JsFelt): Promise<Felts>;
  /**
   * @param {(JsCall)[]} calls
   * @returns {Promise<any>}
   */
  execute(calls: (JsCall)[]): Promise<any>;
  /**
   * @param {(JsCall)[]} calls
   * @returns {Promise<any>}
   */
  execute_from_outside(calls: (JsCall)[]): Promise<any>;
}
export class JsControllerError {
  free(): void;
  code: ErrorCode;
  data?: string;
  message: string;
}
