import { render, screen, fireEvent } from "@testing-library/react";

import { AdminBanner } from "@/components/Admin/AdminBanner/AdminBanner";

describe("AdminBanner (Unit)", () => {
    const mockProps = {
        bannerUrl: "test-banner.jpg",
        deleteBanner: jest.fn(),
    };
    const deleteButtonText = "Видалити";

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.NEXT_PUBLIC_API_URL = "http://test-api";
    });

    it("renders banner image with correct URL", () => {
        render(<AdminBanner {...mockProps} />);

        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", `${process.env.NEXT_PUBLIC_API_URL}/uploads/banners/${mockProps.bannerUrl}`);
    });

    it("renders delete button", () => {
        render(<AdminBanner {...mockProps} />);

        const deleteButton = screen.getByText(deleteButtonText);
        expect(deleteButton).toBeInTheDocument();
    });

    it("calls deleteBanner with correct bannerUrl when delete button is clicked", () => {
        render(<AdminBanner {...mockProps} />);

        const deleteButton = screen.getByText(deleteButtonText);
        fireEvent.click(deleteButton);

        expect(mockProps.deleteBanner).toHaveBeenCalledTimes(1);
        expect(mockProps.deleteBanner).toHaveBeenCalledWith(mockProps.bannerUrl);
    });
}); 