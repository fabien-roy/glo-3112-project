import ReactGA from 'react-ga';

const logPageView = (pathname: string, search: string) => {
  ReactGA.set({ page: pathname });
  ReactGA.pageview(`${pathname}${search}`);
};

export default logPageView;
