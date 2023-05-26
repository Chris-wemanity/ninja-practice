import * as express from 'express';
import cors from "cors";
import * as swaggerUi from 'swagger-ui-express';


export const expressApp = async(app: any) => {
  app.use(express.json());
  app.use(cors());



  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`))
}