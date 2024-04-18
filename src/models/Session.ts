export interface Session{
    id          :number,
    login_date  :Date,
    logout_date :Date | null,
    profileId   :number,
}