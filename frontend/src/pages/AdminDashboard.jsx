import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  Clock, 
  FileText, 
  Plus, 
  Trash2, 
  TrendingUp, 
  Globe, 
  Smartphone, 
  Monitor,
  CheckCircle2,
  Pencil,
  ExternalLink,
  Search,
  ImageOff,
  LoaderCircle,
} from 'lucide-react';
import PostEditor from '../components/admin/PostEditor';
import { BACKEND_URL, ADMIN_TOKEN_KEY, adminRequest } from '../lib/api';

export default function AdminDashboard() {
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [overview, setOverview] = useState(null);
  const [traffic, setTraffic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('traffic'); // 'traffic' | 'posts'

  // undefined = posts list, null = new post, object = editing that post
  const [editingPost, setEditingPost] = useState(undefined);
  const [openingPostId, setOpeningPostId] = useState(null);
  const [postSearch, setPostSearch] = useState('');

  useEffect(() => {
    if (!token) return;
    loadDashboardData();
  }, [token]);

  const handleLogout = () => {
    fetch(`${BACKEND_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken('');
    setEditingPost(undefined);
  };

  const handleAuthError = () => {
    alert('Your session has expired. Please sign in again.');
    handleLogout();
  };

  const loadDashboardData = async () => {
    const results = await Promise.allSettled([
      adminRequest('/api/admin/summit/overview', { token }),
      adminRequest('/api/admin/summit/traffic', { token }),
      adminRequest('/api/admin/summit/posts', { token }),
    ]);
    if (results.some((r) => r.status === 'rejected' && r.reason?.status === 401)) {
      handleLogout();
      return;
    }
    const [resOverview, resTraffic, resPosts] = results;
    if (resOverview.status === 'fulfilled') setOverview(resOverview.value.data);
    if (resTraffic.status === 'fulfilled') setTraffic(resTraffic.value.data);
    if (resPosts.status === 'fulfilled') setPosts(resPosts.value.data);
  };

  const openPost = async (id) => {
    setOpeningPostId(id);
    try {
      const { data } = await adminRequest(`/api/admin/summit/posts/${id}`, { token });
      setEditingPost(data);
    } catch (err) {
      if (err.status === 401) handleAuthError();
      else alert(err.message);
    } finally {
      setOpeningPostId(null);
    }
  };

  const filteredPosts = posts.filter((p) => {
    const q = postSearch.trim().toLowerCase();
    return !q || p.title?.toLowerCase().includes(q) || p.slug?.includes(q) || p.category?.toLowerCase().includes(q);
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });
      const data = await res.json();
      if (res.ok && (data.token || data.user)) {
        const receivedToken = data.token || 'logged_in';
        localStorage.setItem(ADMIN_TOKEN_KEY, receivedToken);
        setToken(receivedToken);
      } else {
        alert(data.message || 'Login failed: Invalid credentials');
      }
    } catch {
      alert('Could not connect to backend authentication');
    }
  };

  const handleDeletePost = async (post) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    try {
      await adminRequest(`/api/admin/summit/posts/${post._id}`, { method: 'DELETE', token });
      loadDashboardData();
    } catch (err) {
      if (err.status === 401) handleAuthError();
      else alert(err.message);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#090a12] flex items-center justify-center p-4 text-slate-100">
        <div className="bg-[#121526] border border-white/10 p-8 rounded-3xl max-w-sm w-full">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e01377]">Superadmin Portal</span>
            <h1 className="font-heading font-black text-2xl text-white mt-1">Summit Admin</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hibarri.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#7a2fd6]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#7a2fd6]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-[#1863dc] to-[#e01377] hover:opacity-90 transition-opacity"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090a12] text-slate-100 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7a2fd6]">Superadmin Control</span>
            <h1 className="font-heading font-black text-3xl text-white">Summit Console</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('traffic')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'traffic' ? 'bg-[#7a2fd6] text-white' : 'bg-white/5 text-slate-400'
              }`}
            >
              Traffic & Analytics
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'posts' ? 'bg-[#7a2fd6] text-white' : 'bg-white/5 text-slate-400'
              }`}
            >
              Posts ({posts.length})
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-rose-400 border border-white/10"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Overview Stats Cards */}
        {overview && !(activeTab === 'posts' && editingPost !== undefined) && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#121526] p-6 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-semibold">Total Page Views</span>
                <Eye className="w-4 h-4 text-[#1863dc]" />
              </div>
              <div className="font-heading font-black text-3xl text-white">{overview.totalPageViews}</div>
            </div>
            <div className="bg-[#121526] p-6 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-semibold">Visitor Sessions</span>
                <Users className="w-4 h-4 text-[#7a2fd6]" />
              </div>
              <div className="font-heading font-black text-3xl text-white">{overview.totalSessions}</div>
            </div>
            <div className="bg-[#121526] p-6 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-semibold">Published Posts</span>
                <FileText className="w-4 h-4 text-[#e01377]" />
              </div>
              <div className="font-heading font-black text-3xl text-white">{overview.totalPosts}</div>
            </div>
            <div className="bg-[#121526] p-6 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-semibold">Active Pages</span>
                <Globe className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="font-heading font-black text-3xl text-white">{overview.totalPages}</div>
            </div>
          </div>
        )}

        {/* TAB 1: TRAFFIC MONITORING */}
        {activeTab === 'traffic' && traffic && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Referrers */}
              <div className="bg-[#121526] p-6 rounded-2xl border border-white/10">
                <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#7a2fd6]" /> Acquisition Sources
                </h3>
                <div className="space-y-3">
                  {traffic.referrerStats?.map((ref, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm py-1.5 border-b border-white/5">
                      <span className="text-slate-300">{ref._id || 'Direct / Bookmark'}</span>
                      <span className="font-bold text-white">{ref.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Devices */}
              <div className="bg-[#121526] p-6 rounded-2xl border border-white/10">
                <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-[#1863dc]" /> Device Breakdown
                </h3>
                <div className="space-y-3">
                  {traffic.deviceStats?.map((dev, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm py-1.5 border-b border-white/5">
                      <span className="capitalize text-slate-300">{dev._id}</span>
                      <span className="font-bold text-white">{dev.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Sessions Table */}
            <div className="bg-[#121526] p-6 rounded-2xl border border-white/10">
              <h3 className="font-heading font-bold text-lg text-white mb-4">Recent Visitor Activity</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="text-slate-400 border-b border-white/10 pb-2">
                    <tr>
                      <th className="py-2">Visitor / Session</th>
                      <th>Landing Page</th>
                      <th>Views</th>
                      <th>Referrer</th>
                      <th>Last Seen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {traffic.sessions?.slice(0, 15).map((s) => (
                      <tr key={s._id} className="hover:bg-white/5">
                        <td className="py-2.5 font-mono text-[11px] text-slate-400">{s.sessionId.substring(0, 16)}...</td>
                        <td className="text-white font-medium">{s.landingPage}</td>
                        <td>{s.pageViews}</td>
                        <td>{s.referrerLabel}</td>
                        <td className="text-slate-400">{new Date(s.lastSeenAt).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: POSTS & CONTENT MANAGEMENT */}
        {/* Kept mounted while on other tabs so an open editor never loses unsaved work */}
        <div className={activeTab === 'posts' ? '' : 'hidden'}>
          {editingPost !== undefined ? (
            <PostEditor
              post={editingPost}
              token={token}
              onSaved={loadDashboardData}
              onClose={() => setEditingPost(undefined)}
              onAuthError={handleAuthError}
            />
          ) : (
            <div className="bg-[#121526] p-6 rounded-2xl border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <h3 className="font-heading font-bold text-lg text-white">Articles ({posts.length})</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="search"
                      placeholder="Search title, slug, category"
                      value={postSearch}
                      onChange={(e) => setPostSearch(e.target.value)}
                      className="w-64 pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#7a2fd6]"
                    />
                  </div>
                  <button
                    onClick={() => setEditingPost(null)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-[#1863dc] to-[#e01377] hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" /> New post
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
                {filteredPosts.length === 0 && (
                  <p className="text-sm text-slate-400 py-8 text-center">
                    {posts.length ? 'No posts match your search.' : 'No posts yet — create your first one.'}
                  </p>
                )}
                {filteredPosts.map((p) => (
                  <div
                    key={p._id}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 flex items-center gap-4"
                  >
                    {p.featuredImageUrl ? (
                      <img src={p.featuredImageUrl} alt="" className="w-20 h-12 object-cover rounded-lg shrink-0" />
                    ) : (
                      <div className="w-20 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <ImageOff className="w-4 h-4 text-slate-600" />
                      </div>
                    )}
                    <button onClick={() => openPost(p._id)} className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                            p.status === 'published' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                          }`}
                        >
                          {p.status}
                        </span>
                        <h4 className="font-heading font-bold text-sm text-white truncate">{p.title}</h4>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        /post/{p.slug} • {p.category || 'General'} •{' '}
                        {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : 'Not published'}
                      </span>
                    </button>
                    <div className="flex items-center gap-1 shrink-0">
                      {p.status === 'published' && (
                        <a
                          href={`/post/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                          title="View live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => openPost(p._id)}
                        disabled={openingPostId === p._id}
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                        title="Edit post"
                      >
                        {openingPostId === p._id ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Pencil className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeletePost(p)}
                        className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/5"
                        title="Delete post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
