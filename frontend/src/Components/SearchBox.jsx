import { Form, InputGroup, FormControl, Button, useState, useNavigate, useEffect, useLocation } from '../imports.js';
import { getFilterURI } from '../utils.js';
import { useDebounce } from 'use-debounce';

const SearchBox = () => {

    const navigate = useNavigate();
    const { search } = useLocation();

    // Retrieve the 'q' query parameter from the search URL
    const initialQuery = new URLSearchParams(search).get('q') || '';

    const [text, setText] = useState(initialQuery);
    const [query] = useDebounce(text, 1000);

    useEffect(() => {

        if (!query) return;
        const filterURI = getFilterURI(search, { query: query });
        navigate(filterURI);
        document.getElementById('q').focus();

    }, [query, navigate, search]);

    const submitHandler = (e) => {
        e.preventDefault();
        const filterURI = getFilterURI(search, { query: query });
        navigate(filterURI);
        document.getElementById('q').focus();

    }

    return (
        <Form onSubmit={submitHandler}>
            <InputGroup>
                <FormControl type="text" name="q" id="q" placeholder="Search for..." aria-describedby="button-search"
                    value={text} onChange={(e) => setText(e.target.value)}></FormControl>
                <Button variant="outline-primary" id="button-search" type='submit'>
                    <i className="fa fa-search"></i>
                </Button>
            </InputGroup>
        </Form>
    )
}

export default SearchBox;
