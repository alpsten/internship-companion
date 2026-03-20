export const siteConfig = {
  name: 'Internship Companion',
  repoUrl: 'https://github.com/alpsten/internship-companion',
  ownerName: '/alpsten',
  ownerUrl: 'https://github.com/alpsten',
  contactEmail: 'hello.alpstone@gmail.com'
} as const;

export const repoDocsBaseUrl = `${siteConfig.repoUrl}/blob/main/docs`;

export const siteShellClassName = 'mx-auto w-full max-w-6xl px-6 sm:px-10';

export const resolveAssetUrl = (path: string) => {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:')) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
};
