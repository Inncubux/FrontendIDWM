export interface User {
    firtsName?:    string;
    lastName?:     string;
    email:         string;
    thelephone?:   string;
    street?:       string;
    number?:       string;
    commune?:      string;
    region?:       string;
    postalCode?:   string;
    birthDate?:    Date;
    registeredAt?: Date;
    lastAccess?:   null;
    isActive?:     boolean;
    token:         string;
    role?:          string;
}
