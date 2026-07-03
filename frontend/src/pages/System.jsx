import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

export default function System() {
  const [health, setHealth] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(true);

  const [githubLoading, setGithubLoading] = useState(false);
  const [githubResult, setGithubResult] = useState(null);

  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsResult, setJobsResult] = useState(null);

  useEffect(() => {
    checkHealth();
  }, []);

  async function checkHealth() {
    setLoadingHealth(true);
    try {
      const res = await axios.get(`${API}/health`);
      setHealth(res.data);
    } catch (err) {
      console.error(err);
      setHealth(null);
    }
    setLoadingHealth(false);
  }

  async function ingestGithub() {
    setGithubLoading(true);
    try {
      const res = await axios.post(`${API}/ingest`);
      setGithubResult(res.data);
    } catch (err) {
      console.error(err);
    }
    setGithubLoading(false);
  }

  async function ingestJobs() {
    setJobsLoading(true);
    try {
      const res = await axios.post(`${API}/ingest/jobs`);
      setJobsResult(res.data);
    } catch (err) {
      console.error(err);
    }
    setJobsLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
        <h1 className="text-2xl font-mono tracking-wider text-white uppercase">
          System Control Center
        </h1>
      </div>

      {/* CORE FRAMEWORK SUB-BOXES */}
      <div className="space-y-6">
        
        {/* HEALTH CONTAINER */}
        <div className="bg-slate-950 rounded-xl border border-slate-900 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="font-mono text-sm uppercase tracking-wide text-white font-bold">
              Backend Integrity
            </h2>
            <p className="text-slate-500 text-xs font-mono">
              Monitor active REST endpoints.
            </p>
            <div className="pt-2">
              {loadingHealth ? (
                <span className="font-mono text-xs text-slate-600 animate-pulse uppercase">Querying Node...</span>
              ) : health ? (
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                  <span>ONLINE // STATUS: {health.status}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 font-mono text-xs text-red-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span>DISCONNECTED</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={checkHealth}
            className="md:self-center border border-slate-800 hover:border-emerald-500/40 text-slate-400 hover:text-emerald-400 font-mono text-xs uppercase tracking-widest px-4 py-2.5 rounded transition-all duration-200"
          >
            Ping
          </button>
        </div>

        {/* GITHUB INGEST */}
        <div className="bg-slate-950 rounded-xl border border-slate-900 p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-mono text-sm uppercase tracking-wide text-white font-bold">
                Knowledge Ingestion Pipeline
              </h2>
              <p className="text-slate-500 text-xs font-mono">
                Synchronize external dataset metrics directly into native local vectors.
              </p>
            </div>
            <button
              onClick={ingestGithub}
              disabled={githubLoading}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-black font-mono font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-all duration-200"
            >
              {githubLoading ? "Processing" : "Sync Database"}
            </button>
          </div>

          {githubResult && (
            <div className="rounded-lg bg-[#030712] border border-slate-900 p-4 font-mono text-xs space-y-1.5 animate-slide-up">
              <p className="text-emerald-400 font-bold tracking-wide">// {githubResult.message}</p>
              <p className="text-slate-500">
                Payload blocks allocated: <span className="text-slate-200 font-bold">{githubResult.documents_added}</span>
              </p>
            </div>
          )}
        </div>

        {/* JOB INGEST */}
        <div className="bg-slate-950 rounded-xl border border-slate-900 p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-mono text-sm uppercase tracking-wide text-white font-bold">
                Market Datasets
              </h2>
              <p className="text-slate-500 text-xs font-mono">
                Populate active metrics matrices from global contextual career maps.
              </p>
            </div>
            <button
              onClick={ingestJobs}
              disabled={jobsLoading}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-black font-mono font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-all duration-200"
            >
              {jobsLoading ? "Mapping" : "Import Index"}
            </button>
          </div>

          {jobsResult && (
            <div className="rounded-lg bg-[#030712] border border-slate-900 p-4 font-mono text-xs space-y-1.5 animate-slide-up">
              <p className="text-emerald-400 font-bold tracking-wide">// {jobsResult.message}</p>
              <p className="text-slate-500">
                Payload blocks allocated: <span className="text-slate-200 font-bold">{jobsResult.documents_added}</span>
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}