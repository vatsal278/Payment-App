"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import api from "@/lib/api";
import { Search, Star, Clock, Loader2, UserPlus, X } from "lucide-react";

export default function SearchPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [recentContacts, setRecentContacts] = useState([]);
    const searchTimeout = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!loading && !user) router.push("/login");
    }, [user, loading]);

    // Load favorites from localStorage and recent contacts from transaction history
    useEffect(() => {
        if (user) {
            const saved = localStorage.getItem(`fc_favorites_${user.id}`);
            if (saved) setFavorites(JSON.parse(saved));
            loadRecentContacts();
        }
    }, [user]);

    const loadRecentContacts = async () => {
        try {
            const { data } = await api.get("/transfer/history?limit=20");
            const txs = data.data?.transactions || [];
            const seen = new Set();
            const contacts = [];

            txs.forEach(tx => {
                const isMe = tx.sender_id === user.id;
                const otherId = isMe ? tx.receiver_id : tx.sender_id;
                const otherName = isMe ? tx.receiver_name : tx.sender_name;
                const otherCashtag = isMe ? tx.receiver_cashtag : tx.sender_cashtag;

                if (!seen.has(otherId) && otherId !== user.id) {
                    seen.add(otherId);
                    contacts.push({ id: otherId, full_name: otherName, cashtag: otherCashtag });
                }
            });

            setRecentContacts(contacts.slice(0, 8));
        } catch (err) {
            console.error("Failed to load recent contacts");
        }
    };

    // Debounced search
    useEffect(() => {
        const q = query.trim();
        if (q.length < 1) {
            setResults([]);
            return;
        }

        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(async () => {
            setIsSearching(true);
            try {
                const { data } = await api.get(`/users/search?q=${encodeURIComponent(q)}`);
                setResults(data.data?.users || []);
            } catch (err) {
                console.error("Search failed");
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(searchTimeout.current);
    }, [query]);

    const toggleFavorite = (person) => {
        let updated;
        const exists = favorites.find(f => f.id === person.id);
        if (exists) {
            updated = favorites.filter(f => f.id !== person.id);
        } else {
            updated = [...favorites, { id: person.id, full_name: person.full_name, cashtag: person.cashtag }];
        }
        setFavorites(updated);
        localStorage.setItem(`fc_favorites_${user.id}`, JSON.stringify(updated));
    };

    const isFavorite = (id) => favorites.some(f => f.id === id);

    const goToPay = (cashtag) => {
        router.push(`/pay?cashtag=${encodeURIComponent(cashtag)}`);
    };

    if (loading || !user) return null;

    const PersonCard = ({ person, showFavStar = true }) => (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all">
            <button
                onClick={() => goToPay(person.cashtag)}
                className="flex items-center space-x-4 flex-1 text-left"
            >
                <div className="w-12 h-12 bg-cashapp/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-cashapp font-bold text-lg">
                        {person.full_name?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                </div>
                <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{person.full_name}</p>
                    <p className="text-xs text-cashapp">{person.cashtag}</p>
                </div>
            </button>
            {showFavStar && (
                <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(person); }}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-full transition-all ml-2"
                >
                    <Star className={`w-5 h-5 ${isFavorite(person.id) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                </button>
            )}
        </div>
    );

    return (
        <div className="pb-24 pt-8 px-6 min-h-screen bg-white dark:bg-black">
            {/* Search Bar */}
            <div className="flex items-center space-x-3 bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl border border-transparent focus-within:border-cashapp transition-all mb-6">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                    ref={inputRef}
                    autoFocus
                    className="bg-transparent outline-none flex-1 font-medium"
                    placeholder="Search people by name or $cashtag"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                    <button onClick={() => setQuery("")} className="p-1">
                        <X className="w-4 h-4 text-gray-400" />
                    </button>
                )}
                {isSearching && <Loader2 className="w-5 h-5 text-cashapp animate-spin shrink-0" />}
            </div>

            {/* Search Results */}
            {query.trim().length > 0 ? (
                <div className="space-y-3">
                    {results.length > 0 ? results.map(person => (
                        <PersonCard key={person.id} person={person} />
                    )) : !isSearching ? (
                        <div className="flex flex-col items-center py-16 text-gray-500">
                            <Search className="w-12 h-12 mb-4 opacity-20" />
                            <p className="font-medium">No users found for "{query}"</p>
                        </div>
                    ) : null}
                </div>
            ) : (
                <>
                    {/* Favorites Section */}
                    {favorites.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center space-x-2">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span>Favorites</span>
                            </h3>
                            {/* Horizontal scroll for favorites */}
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
                                {favorites.map(person => (
                                    <button
                                        key={person.id}
                                        onClick={() => goToPay(person.cashtag)}
                                        className="flex flex-col items-center space-y-2 min-w-[72px] group"
                                    >
                                        <div className="w-14 h-14 bg-cashapp/10 rounded-full flex items-center justify-center border-2 border-amber-400/30 group-hover:border-amber-400 transition-all group-active:scale-90">
                                            <span className="text-cashapp font-bold text-lg">
                                                {person.full_name?.charAt(0)?.toUpperCase() || "?"}
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-center truncate w-full">{person.full_name?.split(' ')[0]}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recent Contacts */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center space-x-2">
                            <Clock className="w-3 h-3" />
                            <span>Recent</span>
                        </h3>
                        <div className="space-y-3">
                            {recentContacts.length > 0 ? recentContacts.map(person => (
                                <PersonCard key={person.id} person={person} />
                            )) : (
                                <div className="flex flex-col items-center py-16 text-gray-500">
                                    <UserPlus className="w-12 h-12 mb-4 opacity-20" />
                                    <p className="font-medium">No recent contacts yet</p>
                                    <p className="text-xs mt-1">Send or receive money to see people here</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}


        </div>
    );
}
