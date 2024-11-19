import jsonwebtoken from "jsonwebtoken";
const jwtgenerate = async (data) => {
    return await jsonwebtoken.sign(data, "myprivatekey", { expiresIn: '7d' });
}

export default jwtgenerate;