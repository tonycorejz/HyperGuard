import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/dist/client/router";
import Head from 'next/head';
import Container from "../Assets/Container";
import RoutePaths from "../RoutePaths";
import RoutePathsAdmin from "../RoutePathsAdmin";

const Routing = () => {
    const router = useRouter();
    const Pages = RoutePaths;
    const isAdminPage = () => router.asPath.startsWith('/admin/');
    const isCurrentPage = (path) => router.asPath == path;
    const {lang} = useTranslation("routing");
    const getCurrentPage = () => {
        const page = getRouting().filter(v => isCurrentPage(v.route));
        return page.length < 1 ? router.asPath : page[0][`name_${lang}`];
    };

    const getRouting = () => isAdminPage() ? RoutePathsAdmin : Pages;

    return (
        <>
        <Head>
            <title>{getCurrentPage()}</title>
        </Head>
            {getRouting().map((v, index) => {
                    return (
                        <Container key={"route-" + index} 
                            className={`for-a ${isCurrentPage(v.route) ? "select" : ""}`}
                            margin={false}>
                                <a href={v.route}>{v[`name_${lang}`]}</a>
                        </Container>
                    );
                })}
        </>
    );
};

export default Routing;