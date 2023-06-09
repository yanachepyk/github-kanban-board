import { Container, Link, LinksWrapper, Stars } from './RepositoryInfo.styled';
import { IoIosArrowForward } from 'react-icons/io';
import { BsFillStarFill } from 'react-icons/bs';
import {
  AuthorInformation,
  RepositoryInformation,
} from '../../redux/dashboard/dashboard.model';

const RepositoryInfo = ({
  author,
  repository,
}: {
  author: AuthorInformation;
  repository: RepositoryInformation;
}) => {
  return (
    <Container>
      <LinksWrapper>
        <Link href={author.url} target="_blank" rel="noreferrer noopener">
          {author.username}
        </Link>
        <IoIosArrowForward />
        <Link href={repository.url} target="_blank" rel="noreferrer noopener">
          {repository.name}
        </Link>
      </LinksWrapper>
      <Stars>
        {repository.stars}
        <BsFillStarFill fill="yellow" stroke="black" strokeWidth="1" />
      </Stars>
    </Container>
  );
};

export default RepositoryInfo;
