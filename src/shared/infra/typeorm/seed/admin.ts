import { getConnection } from "typeorm";
import {v4 as uuidv4} from "uuid";
import {hash} from "bcryptjs";

async function create() {
    const connection = getConnection();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, admin, created_at)
        values('${id}', 'admin', 'admin@rentx.com', '${password}', true, now())`
    )
}

create().then(() => console.log("User admin created."));