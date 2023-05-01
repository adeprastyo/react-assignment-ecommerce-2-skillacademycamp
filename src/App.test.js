import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import App from "./App";

global.fetch = jest.fn();

describe("Render", () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it("should show Loading component", async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(products),
        });
        render(<App />);
        await waitFor(async () =>
            expect(await screen.findByText("Loading ...")).toBeTruthy()
        );
    });

    it("Should call correct path", async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(products),
        });
        render(<App />);
        screen.getByText("Loading ...");
        await screen.findByText("Tank Top Crop Rib Kerah Henley");

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:3001/products"
            );
        });
    });

    it("should render all fetched items correctly", async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(products),
        });
        const { container } = render(<App />);
        await screen.findByText("Tank Top Crop Rib Kerah Henley");
        const cards = Array.from(container.querySelectorAll(".product-card"));
        const contents = extractContent(cards);

        expect(contents).toEqual(
            products.map((product) => {
                return product.name;
            })
        );
    });
});

describe("Search", () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it("should correctly search by name", async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(products),
        });
        const { container } = render(<App />);
        await screen.findByText("Tank Top Crop Rib Kerah Henley");

        const search = await screen.findByTestId("searchInput");

        fireEvent.input(search, { target: { value: "gaun" } });

        const searchButton = await screen.findByTestId("searchButton");

        fireEvent.click(searchButton);

        const cards = Array.from(container.querySelectorAll(".product-card"));

        const contents = extractContent(cards);

        expect(contents).toEqual(
            products
                .filter((product) => {
                    return product.name.toLowerCase().includes("gaun");
                })
                .map((product) => {
                    return product.name;
                })
        );
    });
});

describe("Filter", () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it("should show all product correctly when filtered by all", async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(products),
        });
        const { container } = render(<App />);
        await screen.findByText("Tank Top Crop Rib Kerah Henley");

        const filter = await screen.findByTestId("filterBy");

        fireEvent.change(filter, { target: { value: "All" } });

        const cards = Array.from(container.querySelectorAll(".product-card"));

        const contents = extractContent(cards);

        expect(contents).toEqual(
            products.map((product) => {
                return product.name;
            })
        );
    });

    it("should filter correctly when filtered by men", async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(products),
        });
        const { container } = render(<App />);
        await screen.findByText("Tank Top Crop Rib Kerah Henley");

        const filter = await screen.findByTestId("filterBy");

        fireEvent.change(filter, { target: { value: "Men" } });

        const cards = Array.from(container.querySelectorAll(".product-card"));

        const contents = extractContent(cards);

        expect(contents).toEqual(
            products
                .filter((product) => {
                    return product.category === "Men";
                })
                .map((product) => {
                    return product.name;
                })
        );
    });

    it("should filter correctly when filtered by women", async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(products),
        });
        const { container } = render(<App />);
        await screen.findByText("Tank Top Crop Rib Kerah Henley");

        const filter = await screen.findByTestId("filterBy");

        fireEvent.change(filter, { target: { value: "Women" } });

        const cards = Array.from(container.querySelectorAll(".product-card"));

        const contents = extractContent(cards);

        expect(contents).toEqual(
            products
                .filter((product) => {
                    return product.category === "Women";
                })
                .map((product) => {
                    return product.name;
                })
        );
    });
});

describe("Sort", () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it("should sort correctly when sort by id (Default)", async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(products),
        });
        const { container } = render(<App />);
        await screen.findByText("Tank Top Crop Rib Kerah Henley");
        const sort = await screen.findByTestId("sortBy");

        fireEvent.change(sort, { target: { value: "default" } });

        const cards = Array.from(container.querySelectorAll(".product-card"));

        const contents = extractContent(cards);

        expect(contents).toEqual(
            products
                .sort((a, b) => {
                    return a.id < b.id ? -1 : 1;
                })
                .map((product) => {
                    return product.name;
                })
        );
    });

    it("should sort correctly when sort by price asc (Low to high)", async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(products),
        });
        const { container } = render(<App />);
        await screen.findByText("Tank Top Crop Rib Kerah Henley");
        const sort = await screen.findByTestId("sortBy");

        fireEvent.change(sort, { target: { value: "asc" } });

        const cards = Array.from(container.querySelectorAll(".product-card"));

        const contents = extractContent(cards);

        expect(contents).toEqual(
            products
                .sort((a, b) => {
                    return a.price < b.price ? -1 : 1;
                })
                .map((product) => {
                    return product.name;
                })
        );
    });

    it("should sort correctly when sort by price desc (High to low)", async () => {
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(products),
        });
        const { container } = render(<App />);
        await screen.findByText("Tank Top Crop Rib Kerah Henley");
        const sort = await screen.findByTestId("sortBy");

        fireEvent.change(sort, { target: { value: "desc" } });

        const cards = Array.from(container.querySelectorAll(".product-card"));

        const contents = extractContent(cards);

        expect(contents).toEqual(
            products
                .sort((a, b) => {
                    return a.price < b.price ? 1 : -1;
                })
                .map((product) => {
                    return product.name;
                })
        );
    });
});

const products = [
    {
        id: 1,
        imageUrl:
            "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/457605/item/idgoods_66_457605.jpg?width=320",
        name: "Tank Top Crop Rib Kerah Henley",
        price: 149000,
        category: "Women",
    },
    {
        id: 2,
        imageUrl:
            "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/457328/item/idgoods_09_457328.jpg?width=320",
        name: "UT PlayStation Lengan Pendek",
        price: 199000,
        category: "Men",
    },
    {
        id: 3,
        imageUrl:
            "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/457012/item/idgoods_07_457012.jpg?width=320",
        name: "AIRism Gaun Ultra Stretch Tanpa Lengan",
        price: 499000,
        category: "Women",
    },
    {
        id: 4,
        imageUrl:
            "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/454768/item/idgoods_63_454768.jpg?width=320",
        name: "Cardigan Pendek Mesh Lengan Panjang",
        price: 149000,
        category: "Women",
    },
    {
        id: 5,
        imageUrl:
            "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/456032/item/idgoods_09_456032.jpg?width=320",
        name: "Celana Lurus Lipit",
        price: 399000,
        category: "Women",
    },
    {
        id: 6,
        imageUrl:
            "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462442/item/idgoods_00_462442.jpg?width=320",
        name: "UT Attack on Titan Lengan Pendek",
        price: 199000,
        category: "Men",
    },
    {
        id: 7,
        imageUrl:
            "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/444557/item/idgoods_69_444557.jpg?width=320",
        name: "Jaket AirSense (Ultra Light) Serupa Katun",
        price: 899000,
        category: "Men",
    },
    {
        id: 8,
        imageUrl:
            "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/457349/item/idgoods_64_457349.jpg?width=320",
        name: "Cardigan Jacquard Kerah Bulat Ines de la Fressange",
        price: 599000,
        category: "Women",
    },
    {
        id: 9,
        imageUrl:
            "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/455531/item/idgoods_30_455531.jpg?width=320",
        name: "Celana Pendek Corduroy",
        price: 499000,
        category: "Men",
    },
];

const extractContent = (cards) => {
    return cards
        .map((card) => {
            return Array.from(card.children)
                .filter((child) => {
                    return (
                        products.filter((product) => {
                            return product.name === child.textContent;
                        }).length > 0
                    );
                })
                .map((child) => child.textContent);
        })
        .flat();
};
