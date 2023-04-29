import { Form } from 'react-bootstrap';
import { FormStyled, SubmitButtonStyled } from './SearchForm.styled';

const SearchForm = () => {
    return (
        <FormStyled>
            <Form.Control type="text" placeholder="Enter repo url"/>
            <SubmitButtonStyled variant="primary" type="submit">
                Load issues
            </SubmitButtonStyled>
        </FormStyled>
    )
};

export default SearchForm;