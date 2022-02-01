import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {updateUser} from "../actions/userActions";
import { connect } from "react-redux";

const SettingsForm = ({user, updateUser, setChangingSettings, setUsername}) => {

    const userSchema = Yup.object().shape({
        username: Yup.string().required()
    })

    const initialValues = {
        username: user.username,
        userId: user.userId,
        password: user.password
    }

    const handleSubmit = (values) => {
        updateUser(user.userId, values);
        setChangingSettings(false);
        setUsername(values.username);
    }
    
    return ( 
<Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
        <Form className="connect-form">
        
        <div>
        <label >Nowy Login: </label>
            <Field name="username"></Field>
            <ErrorMessage name="username" component="div"/>
        </div>
        <button type="submit">Zapisz</button>
            
            
        
        </Form>

        
        </Formik>
    );
}
 
const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = {
    updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);