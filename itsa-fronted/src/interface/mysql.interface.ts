export class MySQLInfo {
    static status: number;
    static message: string;

    static reset(): void {
        this.status = 200;
        this.message = "";
    }
}