export interface StateInterface {
  name: string;
  ticker: string;
  balances: BalancesInterface;
  vault: VaultInterface;
  bundlerVault: BundlerVaultInterface;
  bundlers: BundlerInterface
  votes: VoteInterface[];
  roles: RoleInterface;
  settings: [string, any][];
}

// mapping (address => txId)
export interface BundlerInterface {
  [key: string]: string;
}

export interface RoleInterface {
  [key: string]: string;
}

export interface BalancesInterface {
  [key: string]: number;
}

export interface VaultInterface {
  [key: string]: VaultParamsInterface[];
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface BundlerVaultInterface {
  [key: string]: PartialBy<VaultParamsInterface, "end">;
}

export interface VaultParamsInterface {
  balance: number;
  start: number;
  end: number;
}

export interface ActionInterface {
  input: InputInterface;
  caller: string;
}

export interface InputInterface extends VoteInterface, NodeInterface {
  function: GetFunctionType | SetFunctionType;
  cast?: string;
}

export interface NodeInterface {
  host?: string;
  port?: number;
  initialTxId?: string;
}

export interface VoteInterface {
  status?: VoteStatus;
  type?: VoteType;
  id?: number;
  totalWeight?: number;
  recipient?: string;
  target?: string;
  qty?: number;
  key?: string;
  value?: any;
  note?: string;
  yays?: number;
  nays?: number;
  voted?: string[];
  start?: number;
  lockLength?: number;
}

export interface ResultInterface {
  target: string;
  balance: number;
  role: string;
}

export type VoteStatus = "active" | "quorumFailed" | "passed" | "failed";
export type VoteType = "mint" | "mintLocked" | "burnVault" | "indicative" | "set";
export type GetFunctionType = "balance" | "unlockedBalance" | "vaultBalance" | "role";
export type SetFunctionType = "transfer" | "transferLocked" | "vote" | "propose" | "finalize" | "lock" | "increaseVault" | "unlock" | "extend" | "addBundler" | "startNodeUnlock" | "releaseNodeStake";
