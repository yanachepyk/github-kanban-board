import { Form } from 'react-bootstrap';
import {
  FieldContainer,
  LabelStyled,
  SubmitButtonStyled,
} from './SearchForm.styled';
import { useDispatch } from 'react-redux';
import { FetchIssuesAction, fetchAuthor, fetchIssues, fetchRepository } from '../../redux/dashboard/operations';

const githubOriginUrl = "https://github.com";

const SearchForm = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    const { repositoryUrl } = e.target.elements;
    const url = repositoryUrl.value;

    if (!url) {
      return;
    }

    try {
      const processedUrl = new URL(url);

      if (processedUrl.origin === githubOriginUrl) {
        const [_, author, repository] = processedUrl.pathname.split('/');

        console.log('Author: ', author);
        console.log('Repository: ', repository);

        dispatch(fetchIssues({ author, repository }) as unknown as FetchIssuesAction);
        dispatch(fetchAuthor(author) as unknown as any);
        dispatch(fetchRepository({ author, repository }) as unknown as FetchIssuesAction);

        e.target.reset();
      }
    } catch (e) {
      console.error('Please enter a valid URL');
    }
  }
    
  return (
    <Form onSubmit={handleFormSubmit}>
      <LabelStyled htmlFor="repositoryUrl">Repository URL:</LabelStyled>
      <FieldContainer>
        <Form.Control
          type="text"
          id="repositoryUrl"
          placeholder="https://github.com/authorName/repository"
        />
        <SubmitButtonStyled variant="primary" type="submit">
          Load issues
        </SubmitButtonStyled>
      </FieldContainer>
    </Form>
  );
};

export default SearchForm;
