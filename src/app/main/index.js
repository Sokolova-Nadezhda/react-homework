import {memo, useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import AuthHeader from '../../components/auth-header';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();
  const navigate = useNavigate();
  const [userIsAuthorized, setUserIsAuthorized] = useState(false);

  const token = localStorage.getItem('token');

  if (token) {
    !userIsAuthorized && setUserIsAuthorized(true);
  } else {
    userIsAuthorized && setUserIsAuthorized(false);
  }

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.catalog.initCategories();
    if (userIsAuthorized) store.actions.user.initUserProfile(token);
  }, [], true);

  const callbacks = {
    onSignOut: useCallback(token => store.actions.user.signOut(token, navigate), [store]),
  }

  const select = useSelector(state => ({
    userName: state.user.profile.userName,
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthHeader
        token={token}
        buttonTitle={userIsAuthorized ? 'Выход' : 'Вход'}
        link={userIsAuthorized ? '/profile' : '/login'}
        onSignOut={callbacks.onSignOut}
        userName={select.userName}
      />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
