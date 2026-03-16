import type { AnchorHTMLAttributes } from 'react';

export function Link({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const resolvedHref = href ? `${base}${href.startsWith('/') ? href : `/${href}`}` : undefined;

    return <a href={resolvedHref} {...props} />;
}