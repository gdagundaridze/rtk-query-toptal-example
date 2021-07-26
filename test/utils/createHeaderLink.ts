import * as faker from 'faker';
import formatLinkHeader from 'format-link-header';

export const createHeaderLink = (page: number, maxPage: number) => {
  const links: formatLinkHeader.Links = {};

  if (maxPage !== page) {
    links['next'] = {
      page: (page + 1).toString(),
      url: faker.unique(faker.internet.url),
      rel: 'next'
    }
  }

  if (page !== 1) {
    links['prev'] = {
      page: (page - 1).toString(),
      url: faker.unique(faker.internet.url),
      rel: 'prev'
    }
  }

  return links;
}
