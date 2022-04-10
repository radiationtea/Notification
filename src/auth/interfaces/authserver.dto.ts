export interface AuthServerPermCheckRes {
  success: boolean
  data: {
    userId: string
    permission: string
    hasPermission: boolean
  }
}
