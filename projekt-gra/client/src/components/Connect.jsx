import { Formik, Field, Form, ErrorMessage} from "formik";
import {v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import mqtt from 'mqtt';


const userSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
})

const initialValues = {
    username: '',
    host: 'localhost',
    port: 1883,
    clientId: uuidv4(),
    password: ''
}



const Connect = ({connect, publish}) => {

    const handleSubmit = (values) => {
        // console.log(values);
        const { host, clientId, port, username, password } = values;
        // const url = `ws://broker.emqx.io:8083/mqtt`;
        const url = `mqtt://localhost:8000/mqtt`;

        const options = {
            keepalive: 30,
            clientId: clientId,
            protocolId: 'MQTT',
            protocolVersion: 5,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            will: {
              topic: 'WillMsg',
              payload: 'Connection Closed abnormally..!',
              qos: 2,
              retain: false
            },
            rejectUnauthorized: false
          }

          options.username = username;
          options.password = password;

          connect(url, options);
        //   publish('game-list-board', JSON.stringify({username, type: "log-in"}))  
    }

    return ( 
        <div className="connect-box">
            <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
        <Form className="connect-form">
        
        <div>
        <label >Login: </label>
            <Field name="username"></Field>
            <ErrorMessage name="username" component="div"/>
        </div>
        
        <div>
        <label >Hasło: </label>
            <Field name="password" type="password"></Field>
            <ErrorMessage name="password" component="div"/>

            
        </div>
        <button type="submit">Połącz</button>
            
            
        
        </Form>

        
        </Formik>
        </div>
     );
}
 
export default Connect;