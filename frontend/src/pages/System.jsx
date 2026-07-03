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
    <div className="space-y-8">

      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          System Control Center
        </h1>
      </div>

      {/* HEALTH */}

      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-xl font-bold text-white">
              Backend Health
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Verify the FastAPI server status.
            </p>
          </div>

          <button
            onClick={checkHealth}
            className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition"
          >
            Refresh
          </button>

        </div>

        <div className="mt-6">

          {loadingHealth ? (

            <p className="text-slate-400">
              Checking server...
            </p>

          ) : health ? (

            <div className="flex items-center gap-3">

              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"/>

              <span className="text-green-400 font-semibold">
                Server Online
              </span>

              <span className="text-slate-500">
                Status : {health.status}
              </span>

            </div>

          ) : (

            <div className="flex items-center gap-3">

              <div className="h-3 w-3 rounded-full bg-red-500"/>

              <span className="text-red-400">
                Backend Offline
              </span>

            </div>

          )}

        </div>

      </div>

      {/* GITHUB INGEST */}

      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-xl font-bold text-white">
              GitHub Knowledge Base
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Download trending repositories and insert them into the vector database.
            </p>

          </div>

          <button
            onClick={ingestGithub}
            disabled={githubLoading}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition"
          >
            {githubLoading ? "Ingesting..." : "Run Ingestion"}
          </button>

        </div>

        {githubResult && (

          <div className="mt-6 rounded-xl bg-slate-950 border border-slate-800 p-4">

            <p className="text-green-400 font-semibold">
              {githubResult.message}
            </p>

            <p className="text-slate-300 mt-2">
              Documents Added :
              <span className="text-blue-400 font-bold ml-2">
                {githubResult.documents_added}
              </span>
            </p>

          </div>

        )}

      </div>

      {/* JOB INGEST */}

      <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-xl font-bold text-white">
              Job Dataset
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Import the AI career job dataset into the vector database.
            </p>

          </div>

          <button
            onClick={ingestJobs}
            disabled={jobsLoading}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 transition"
          >
            {jobsLoading ? "Importing..." : "Import Jobs"}
          </button>

        </div>

        {jobsResult && (

          <div className="mt-6 rounded-xl bg-slate-950 border border-slate-800 p-4">

            <p className="text-green-400 font-semibold">
              {jobsResult.message}
            </p>

            <p className="text-slate-300 mt-2">
              Documents Added :
              <span className="text-purple-400 font-bold ml-2">
                {jobsResult.documents_added}
              </span>
            </p>

          </div>

        )}

      </div>

    </div>
  );
}