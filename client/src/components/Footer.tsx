import React from 'react';
import Link from "@mui/material/Link";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Box from "@mui/material/Box";

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6, display: 'flex', justifyContent: 'center', gap: '3%', borderTop: '1px solid #896E69', maxHeight: '60px'}} component="footer">
            <Link href="https://www.instagram.com/m_vorobyovaa" target='_blank'><InstagramIcon /></Link>
            <Link href="https://t.me/m_vorobyovaa" target='_blank'><TelegramIcon /></Link>
            <Link href="https://github.com/MaryiaVarabyevaa" target='_blank'><GitHubIcon /></Link>
            <Link href="https://www.linkedin.com/in/maryia-varabyeva-b6612a21b/" target='_blank'><LinkedInIcon /></Link>
        </Box>
    );
};

export default Footer;