package jsongenerators;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.jetty.util.ajax.JSON;
import org.junit.Test;

import play.libs.Json;

public class GenerateCarousel {

  private class CarouselItems {
    public CarouselItems(String name, String description, String readMoreUrl, String imageUrl) {
      super();
      this.name = name;
      this.description = description;
      this.readMoreUrl = readMoreUrl;
      this.imageUrl = imageUrl;
    }

    private String name;
    private String description;
    private String readMoreUrl;
    private String imageUrl;

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public String getDescription() {
      return description;
    }

    public void setDescription(String description) {
      this.description = description;
    }

    public String getReadMoreUrl() {
      return readMoreUrl;
    }

    public void setReadMoreUrl(String readMoreUrl) {
      this.readMoreUrl = readMoreUrl;
    }

    public String getImageUrl() {
      return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
      this.imageUrl = imageUrl;
    }
  }

  @Test
  public void test() {
    List<CarouselItems> list = new ArrayList<>();
    list.add(new CarouselItems(
        "Deploywise",
        "With automated deployment becoming less of a vision and more of a standard, DeployWise enables development teams to securely manage the deployment of software and processes across multiple environments while improving stability, reducing risk, providing auditing capabilities and rapid assembly of repeatable deployment instruction books.",
        "/deploywise", "/assets/images/clock.png"));
    list.add(new CarouselItems(
        "dupes.tf",
        "Dupes.tf is a virtual-item duplication reporting system built for the Team Fortress 2 gaming community. By automatically identifying duplicate items in the virtual universe it acts as a due diligence mechanism to reduce or avoid asset devaluation caused by duplication. Fully standards compliant with the latest HTML5 technologies and built with security in mind, the site boasts a 7 day time to market.",
        "/dupes", "/assets/images/telephone.png"));
    list.add(new CarouselItems(
        "list.tf",
        "list.tf is a powerful most-wanted list for Team Fortress 2 virtual items, allowing players to provide a detailed breakdown of item attributes as well as their price.",
        "/list.tf", "/assets/images/market.png"));
    System.out.println(Json.toJson(list).toString());
  }

}
