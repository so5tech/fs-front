import c from "cors";

const cors = () : any => c({origin: "*",methods: "GET,HEAD,PUT,PATCH,POST,DELETE",allowedHeaders: "*"});
export default cors;