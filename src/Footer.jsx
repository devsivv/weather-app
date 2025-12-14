function Footer() {
    const currentYear = new Date().getFullYear();

    return (
<footer class="footer">
  <p>
    © {currentYear} Weather Dashboard 
    </p>
    <p>
  • Built by Shivam Dubey
  &nbsp;&nbsp; • Data powered by OpenWeather API
</p>
</footer>

    );
}

export default Footer;