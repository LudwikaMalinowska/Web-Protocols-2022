import { Formik, Field, Form, ErrorMessage} from "formik";
import { updateGame } from "../actions/gameActions";
import { connect } from "react-redux";




const EditRoom = ({game, setEditing, updateGame}) => {

    const initialValues = {
        gameName: 'Bez nazwy' || game.name,
        gameId: game.topic
    }

    const handleSubmit = (values) => {
        updateGame(game.topic, values)
        setEditing(false)
    }

    return ( 
    <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}>
    <Form className="connect-form">
    
    <label >Nazwa pokoju: </label>
        <Field name="gameName" ></Field>
        
        <button type="submit">Zatwierdź</button>
    
    </Form>

    
    </Formik> );
}
 
const mapStateToProps = (state) => {
    return {
        games: state.games
    }
}

const mapDispatchToProps = {
    updateGame
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRoom);