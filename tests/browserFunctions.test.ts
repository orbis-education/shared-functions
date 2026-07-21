// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  exportCSVFile,
  getBrowserData,
  getFetchAuthorization,
  resolveBaseURL,
  showPlayground
} from "../index.js";

declare const jsdom: {
  reconfigure: (settings: { url: string }) => void;
};

const setTestURL = (url: string) => {
  jsdom.reconfigure({ url });
};

describe("browser-dependent helpers", () => {
  beforeEach(() => {
    setTestURL("https://example.com/");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("getBrowserData returns values from navigator", () => {
    const browserData = getBrowserData();

    expect(browserData).toEqual({
      appCodeName: navigator.appCodeName,
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      cookieEnabled: navigator.cookieEnabled,
      language: navigator.language,
      onLine: navigator.onLine,
      platform: navigator.platform,
      product: navigator.product,
      userAgent: navigator.userAgent
    });
  });

  it("exportCSVFile creates a blob URL and triggers an anchor download", () => {
    const createObjectURL = vi.fn<(blob: Blob) => string>(() => "blob:test-url");
    let clickedHref = "";
    let clickedDownload = "";

    Object.defineProperty(window.URL, "createObjectURL", {
      configurable: true,
      writable: true,
      value: createObjectURL
    });

    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
      this: HTMLAnchorElement
    ) {
      clickedHref = this.href;
      clickedDownload = this.download;
    });

    exportCSVFile("name,value\r\nA,1", "Report");

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(createObjectURL.mock.calls[0]?.[0]).toBeInstanceOf(Blob);
    expect(clickedHref).toBe("blob:test-url");
    expect(clickedDownload).toMatch(/^Report \d{2}_\d{2}_\d{4}\.csv$/);
    expect(document.body.childElementCount).toBe(0);
  });

  it("showPlayground returns true for intranet test_local URLs outside production", () => {
    setTestURL("https://intranet.orbiseducation.com/test_local/sample/index.html");

    expect(showPlayground("staging", false)).toBe(true);
    expect(showPlayground("production", false)).toBe(false);
  });

  it("getFetchAuthorization switches to the development database for lor-dev URLs", () => {
    setTestURL("https://lor-dev.orbiseducation.com/app/");

    const encodedAuthorization = getFetchAuthorization(
      42,
      "prod-db",
      "dev-db",
      "token-123",
      "production",
      false
    );

    const decodedAuthorization = JSON.parse(window.atob(encodedAuthorization));

    expect(decodedAuthorization).toEqual({
      partnerID: 42,
      databaseName: "dev-db",
      sessionToken: "token-123"
    });
  });

  it("resolveBaseURL respects lor-dev hostnames when building production URLs", () => {
    setTestURL("https://lor-dev.orbiseducation.com/dashboard/");

    expect(resolveBaseURL("logs", "production", false, false)).toBe(
      "https://lor-dev.orbiseducation.com/logs/"
    );
  });
});
