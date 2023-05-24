import * as express from 'express';
import cors from "cors";
import * as swaggerDocument from './swagger.json'
import * as swaggerUi from 'swagger-ui-express';


export const expressApp = async(app: any) => {
  app.use(express.json());
  app.use(cors());
  

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`))
}