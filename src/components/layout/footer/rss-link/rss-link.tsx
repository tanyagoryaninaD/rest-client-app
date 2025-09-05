import MuiLink from '@mui/material/Link';
import Image from 'next/image';

export default function RssLink() {
  return (
    <MuiLink
      display="flex"
      href="https://rs.school/courses/reactjs"
      target="_blank"
      sx={{
        border: '1px solid #808080',
        borderRadius: '50%',
        transition: 'transform 0.3s',
        ':hover': { transform: 'scale(1.2)' },
      }}
    >
      <Image
        src="/rss-logo.svg"
        alt="Rolling Scopes School Logo"
        width={30}
        height={30}
        priority
      />
    </MuiLink>
  );
}
