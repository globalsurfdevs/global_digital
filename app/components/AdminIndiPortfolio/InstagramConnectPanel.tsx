"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Label from "../Label/Label";
import type { InstagramPost } from "@/app/lib/integrations/instagram/instagram";

type Connection = {
  username?: string;
  /** Set when posts are read from the client's public account by username. */
  discoveryUsername?: string;
  tokenExpiresAt?: string;
  selectedPostIds?: string[];
} | null;

const InstagramConnectPanel = ({ portfolioId }: { portfolioId: string }) => {
  const [connection, setConnection] = useState<Connection>(null);
  const [token, setToken] = useState("");
  const [igUserId, setIgUserId] = useState("");
  const [clientUsername, setClientUsername] = useState("");
  const [busy, setBusy] = useState(false);

  // Post picker state. `selected` keeps click order, which is display order.
  const [picking, setPicking] = useState(false);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const endpoint = `/api/instagram/connection?portfolioId=${portfolioId}`;

  const loadStatus = useCallback(async () => {
    const res = await fetch(endpoint);
    if (res.ok) setConnection((await res.json()).connection);
  }, [endpoint]);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const connect = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/instagram/connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolioId, accessToken: token, igUserId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Connection failed");
      toast.success(`Connected @${json.username}`);
      setToken("");
      setIgUserId("");
      await loadStatus();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Connection failed");
    } finally {
      setBusy(false);
    }
  };

  // Reads the client's public posts with the agency account; the client does
  // nothing. Needs a public Business or Creator account.
  const connectByUsername = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/instagram/connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolioId, username: clientUsername }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Connection failed");
      toast.success(`Showing public posts of @${json.username}`);
      setClientUsername("");
      await loadStatus();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Connection failed");
    } finally {
      setBusy(false);
    }
  };

  const disconnect = async () => {
    setBusy(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Instagram disconnected");
      setConnection(null);
      setPicking(false);
    } catch {
      toast.error("Could not disconnect Instagram");
    } finally {
      setBusy(false);
    }
  };

  const openPicker = async () => {
    setBusy(true);
    try {
      const res = await fetch(`/api/instagram/posts?portfolioId=${portfolioId}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not load posts");
      const loaded: InstagramPost[] = json.posts;
      setPosts(loaded);
      // Keep only earlier picks that are still in the newest posts.
      const available = new Set(loaded.map((post) => post.id));
      setSelected(
        (connection?.selectedPostIds ?? []).filter((id) => available.has(id)),
      );
      setPicking(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load posts");
    } finally {
      setBusy(false);
    }
  };

  // Clears the 1-hour cache so newly published posts show up right away.
  const refreshFromInstagram = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/instagram/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolioId }),
      });
      if (!res.ok) throw new Error();
      toast.success("Refreshed from Instagram");
    } catch {
      toast.error("Could not refresh from Instagram");
      setBusy(false);
      return;
    }
    setBusy(false);
    if (picking) await openPicker();
  };

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const saveSelection = async (ids: string[]) => {
    setBusy(true);
    try {
      const res = await fetch("/api/instagram/connection", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolioId, selectedPostIds: ids }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not save");
      toast.success(
        ids.length > 0
          ? "Selection saved"
          : "Showing the latest posts",
      );
      setPicking(false);
      await loadStatus();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save");
    } finally {
      setBusy(false);
    }
  };

  const pickedCount = connection?.selectedPostIds?.length ?? 0;

  return (
    <div className="mb-6 rounded-lg border border-gray-300 p-4">
      <Label content="Instagram feed" />
      {connection ? (
        <div className="mt-2 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-black">
              {connection.discoveryUsername
                ? "Showing the public posts of "
                : "Connected to "}
              <strong>@{connection.username}</strong>.{" "}
              {pickedCount > 0
                ? `Showing ${pickedCount} hand-picked post${pickedCount === 1 ? "" : "s"}`
                : "Showing the latest posts"}
              {connection.tokenExpiresAt &&
                ` (token valid until ${new Date(connection.tokenExpiresAt).toLocaleDateString()})`}
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={refreshFromInstagram}
                disabled={busy}
                className="rounded-md border border-gray-400 px-3 py-1 text-sm text-black disabled:opacity-50"
              >
                Refresh from Instagram
              </button>
              <button
                type="button"
                onClick={openPicker}
                disabled={busy}
                className="rounded-md border border-gray-400 px-3 py-1 text-sm text-black disabled:opacity-50"
              >
                Choose posts
              </button>
              <button
                type="button"
                onClick={disconnect}
                disabled={busy}
                className="rounded-md border border-red-500 px-3 py-1 text-sm text-red-500 disabled:opacity-50"
              >
                Disconnect
              </button>
            </div>
          </div>

          {picking && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-gray-600">
                Click posts to show them. Numbers show the display order, which
                follows the order you click. Choose from the latest{" "}
                {posts.length} posts. New Instagram posts can take up to an
                hour to appear here; use Refresh from Instagram to load them now.
              </p>
              <div className="grid max-h-[480px] grid-cols-3 gap-3 overflow-y-auto sm:grid-cols-4 lg:grid-cols-6">
                {posts.map((post) => {
                  const position = selected.indexOf(post.id);
                  const isSelected = position !== -1;
                  return (
                    <button
                      key={post.id}
                      type="button"
                      onClick={() => toggle(post.id)}
                      aria-pressed={isSelected}
                      className={`relative aspect-[4/5] overflow-hidden rounded-md border-2 ${
                        isSelected ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={post.image}
                        alt={post.caption?.slice(0, 60) || "Instagram post"}
                        fill
                        sizes="160px"
                        className={`object-cover ${isSelected ? "" : "opacity-70"}`}
                      />
                      {isSelected && (
                        <span className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                          {position + 1}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => saveSelection(selected)}
                  disabled={busy || selected.length === 0}
                  className="rounded-md bg-primary px-4 py-1 text-sm text-white disabled:opacity-50"
                >
                  Save {selected.length > 0 && `(${selected.length})`}
                </button>
                <button
                  type="button"
                  onClick={() => saveSelection([])}
                  disabled={busy}
                  className="rounded-md border border-gray-400 px-3 py-1 text-sm text-black disabled:opacity-50"
                >
                  Show latest posts instead
                </button>
                <button
                  type="button"
                  onClick={() => setPicking(false)}
                  disabled={busy}
                  className="rounded-md px-3 py-1 text-sm text-gray-600 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-sm text-gray-600">
            Enter the client&apos;s Instagram username to show their public
            posts. The client doesn&apos;t log in or share anything. It must be
            a public Business or Creator account. Until connected, the uploaded
            images below are shown.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={clientUsername}
              onChange={(e) => setClientUsername(e.target.value)}
              placeholder="Instagram username, e.g. fayizz.ch"
              className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
            />
            <button
              type="button"
              onClick={connectByUsername}
              disabled={busy || !clientUsername.trim()}
              className="shrink-0 rounded-md bg-primary px-4 py-1 text-sm text-white disabled:opacity-50"
            >
              Connect
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Or, for an account that can't be read publicly (such as a private
            one), paste an access token its owner generated:
          </p>
          <input
            type="text"
            value={igUserId}
            onChange={(e) => setIgUserId(e.target.value)}
            placeholder="Instagram account ID (only for Facebook Login tokens)"
            className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
          />
          <div className="flex gap-2">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Instagram access token"
              className="w-full rounded-md border-[1px] border-gray-300 bg-transparent py-1 pl-4 text-black focus:outline-none"
            />
            <button
              type="button"
              onClick={connect}
              disabled={busy || !token.trim()}
              className="rounded-md bg-primary px-4 py-1 text-sm text-white disabled:opacity-50"
            >
              Connect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramConnectPanel;
