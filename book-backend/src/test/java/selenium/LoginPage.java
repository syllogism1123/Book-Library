package selenium;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

class LoginPage {
    private static WebDriver driver;

    private String baseUrl;
    private String firstname;
    private String lastname;
    private String username;
    private String password;


    @BeforeAll
    static void setup() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
    }

    @AfterAll
    static void close() {
        driver.quit();
    }


    @Test
    void login_successful() throws InterruptedException {
        driver.get("http://localhost:3000/login");


        WebElement usernameInput = driver.findElement(By.name("username"));
        usernameInput.sendKeys("username");

        WebElement passwordInput = driver.findElement(By.name("password"));
        passwordInput.sendKeys("password");


        passwordInput.submit();


        String currentUrl = driver.getCurrentUrl();
        if (!currentUrl.equals("http://localhost:3000/books")) {
            System.out.println("Login test failed.");
        } else {
            System.out.println("Login test succeeded.");
        }


    }


}

