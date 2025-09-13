package com.mossonthetree.trivia.model;

import java.util.Arrays;
import java.util.List;

public enum Category {
    ANY("Any Category", 0),
    GENERAL("General Knowledge", 9),
    BOOKS("Entertainment: Books", 10),
    FILM("Entertainment: Film", 11),
    MUSIC("Entertainment: Music", 12),
    MUSIC_THEATRES("Entertainment: Musicals &amp; Theatres",13),
    TELEVISION("Entertainment: Television", 14),
    VIDEO_GAMES("Entertainment: Video Games", 15),
    BOARD_GAMES("Entertainment: Board Games", 16),
    SCIENCE_NATURE("Science &amp; Nature", 17),
    COMPUTERS("Science: Computers", 18),
    MATHS("Science: Mathematics", 19),
    MYTHOS("Mythology", 20),
    SPORTS("Sports", 21),
    GEO("Geography", 22),
    HISTORY("History", 23),
    HOT_TOPICS("Politics", 24),
    ARTS("Art", 25),
    CELEBS("Celebrities", 26),
    ANIMALS("Animals", 27),
    VEHICLES("Vehicles", 28),
    COMICS("Entertainment: Comics", 29),
    GADGETS("Science: Gadgets", 30),
    AMINE_MANGA("Entertainment: Japanese Anime &amp; Manga", 31),
    CARTOONS("Entertainment: Cartoons &amp; Animations", 32);

    public final String label;

    public final int value;

    Category(String label, int value) {
        this.label = label;
        this.value = value;
    }

    private static final List<Details> DETAILS = Arrays.stream(Category.values())
            .map(c -> new Details(c, c.label, c.value))
            .toList();

    public static List<Details> getDetails() {
        return DETAILS;
    }

    public record Details(Category category, String label, int value) {}
}
