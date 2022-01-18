import { Formik, Field, Form, ErrorMessage} from "formik";
import {v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import mqtt from 'mqtt';


const userSchema = Yup.object().shape({
    username: Yup.string().required()
})

const initialValues = {
    username: '',
    host: 'localhost',
    port: 1883,
    clientId: uuidv4()
}



const Connect = ({connect}) => {

    const handleSubmit = (values) => {
        console.log(values);
        const { host, clientId, port, username } = values;
        // const url = `mqtt://${host}:${port}`;
        const url = `ws://${host}`;

        const options = {
            port: 1883,
            keepalive: 30,
            protocolId: 'MQTT',
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            will: {
              topic: 'WillMsg',
              payload: 'Connection Closed abnormally..!',
              qos: 0,
              retain: false
            },
            rejectUnauthorized: false
          };
          options.clientId = clientId;
          options.username = username;

          connect(url, options);
    }

    return ( 
        <div className="connect-box">
            <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
        <Form className="connect-form">
        
        <label >Login: </label>
            <Field name="username"></Field>
            <ErrorMessage name="username" component="div"/>
            
            <button type="submit">Połącz</button>
        
        </Form>

        
        </Formik>
        </div>
     );
}
 
export default Connect;