import MyCard from '../Components/MyCard.jsx';
import Navbar from '../Components/Navbar.jsx';
import { User } from '../User.jsx';
import { Button, LinkContainer, React, axios, useContext, useEffect, useLocation, useNavigate, useState } from '../imports.js'
import { checkAuthentication, getFilterURI } from '../utils.js';
import '../Styles/Search.css';

export const Search = () => {

    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(User);
    const { userInfo } = state;

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get('q') || 'all';
    const page = searchParams.get('page') || 1;

    const [contents, setContents] = useState(null);
    const [pages, setPages] = useState(null);
    const [pageCount, setPageCount] = useState(null);

    useEffect(() => {
        if (!userInfo) navigate("/signin");
        else {
            const checkAuth = async () => {
                let isAuth = await checkAuthentication(userInfo);
                if (!isAuth) navigate("/signin");
            }
            checkAuth();
        }
    }, []);

    useEffect(() => {
        console.log("in effect")
        const getContents = async () => {
            try {
                const { data } = await axios.get(`/api/v1/contents/search?q=${query}&page=${page}`, {
                    headers: { 'Authorization': `Bearer ${userInfo.token}` },
                }); 
                setContents(data.contents);
                setPages(data.pages);
                setPageCount(data.page);
            } catch (error) {
            }
        };
        getContents();
    }, [query, , page]);

    return (
        <div>
            <Navbar></Navbar>
            <div>
                {contents &&
                    contents.map((c, i) => (<MyCard data={c} key={i}></MyCard>))
                }
            </div>
            <div>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer key={x + 1} className="mx-1" to={{
                        pathname: "/search", search: getFilterURI(search, { pageCount: x + 1 }, true),
                    }}                                        >
                        <Button className={Number(page) === x + 1 ? "highlight-current-page" : ""}
                            variant="light">{x + 1}</Button>
                    </LinkContainer>
                ))}
            </div>

        </div>
    )
}
