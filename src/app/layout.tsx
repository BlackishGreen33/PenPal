import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import '@/common/styles/globals.scss';
import '@liveblocks/react-tiptap/styles.css';
import '@liveblocks/react-ui/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'simplebar-react/dist/simplebar.min.css';

import Provider from '@/common/components/poviders/Provider';
import { Toaster } from '@/common/components/ui/sonner';
import { cn } from '@/common/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'PenPal - 智能协作，书写未来',
  description:
    'PenPal 是为用户提供便捷、优质的在线办公环境，满足用户多样化的远程协作需求，打造的一个项目协作工具。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chatbotScript = `
<script>
window.embeddedChatbotConfig = {
chatbotId: "yywnk94ZYc4X6DzPiNKFv",
domain: "www.chatbase.co"
}
</script>
<script
src="https://www.chatbase.co/embed.min.js"
chatbotId="yywnk94ZYc4X6DzPiNKFv"
domain="www.chatbase.co"
defer>
</script>
`;
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <Provider>
          <Toaster />
          {children}
        </Provider>
        <div dangerouslySetInnerHTML={{ __html: chatbotScript }} />
      </body>
    </html>
  );
}
