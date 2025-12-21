function Footer() {
    const currentYear = new Date().getFullYear();

    return (
<footer class="footer">
  <p>
    © {currentYear} Weather Dashboard 
    </p>
    <div class="footer-separator">
    <p>
  • Built by Shivam Dubey
  &nbsp;&nbsp; </p> <p>• Data powered by OpenWeather API
</p>
    </div>
</footer>

    );
}

export default Footer;