import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const apiCalls = () => `
    SELECT a.user_id, a.operation_type, a.status, added_at
    FROM public.api_logs as a
    WHERE (
        a.operation_type = 'IAPI' 
        AND a.added_at >= $1 
        AND a.added_at < $2
    );
`;

const apiDownloads = () => `
    SELECT d.user_id, d.operation_type, d.name, d.status, d.accessed_at
    FROM public.document_logs as d
    WHERE (
        d.operation_type = 'DDOC' 
        AND d.accessed_at >= $1
        AND d.accessed_at < $2
    );
`;

const members = () => `
    SELECT DISTINCT email, m.created_at FROM public.memberships as m
    WHERE m.created_at >= $1 AND m.created_at < $2;
`;

const developers = () => `
    SELECT m.interest FROM public.memberships as m 
    WHERE m.interest LIKE '%developer%'
        OR m.interest LIKE '%Engineer%'
        AND m.created_at >= $1 
        AND m.created_at < $2;
`;

const memberAges = () => `
    SELECT m.age_range as age, COUNT(m.age_range) as count FROM public.memberships as m
    WHERE m.age_range != 'Select an age range' AND m.created_at >= $1 AND m.created_at < $2
    GROUP BY m.age_range
    ORDER BY count DESC;
`;

const memberGenders = () => `
    SELECT m.gender, COUNT(m.gender) as count FROM public.memberships as m
    WHERE m.created_at >= $1 AND m.created_at < $2
    GROUP BY m.gender
    ORDER By count DESC;
`;

const memberLocations = () => `
    SELECT m.location, COUNT(m.location) as count FROM public.memberships as m
    WHERE m.location != 'Choose your current location' AND m.created_at >= $1 AND m.created_at < $2
    GROUP BY m.location
    ORDER By count DESC;
`;

const apiCallers = () => `
    SELECT DISTINCT a.user_id, a.operation_type
    FROM public.api_logs as a
    WHERE (
        a.operation_type = 'IAPI' 
        AND a.added_at >= $1
        AND a.added_at < $2
    );
`;

const apiCallsIntensity = (tsmeasure: string) => {
    const [field, measure] = tsmeasure === 'day' ? ['day', 'DOW'] : ['hour', 'hour'];
    return `
        SELECT ${field}, count(${field}) as intensity
        FROM
        (
            SELECT extract(${measure} from added_at) AS ${field}
            FROM public.api_logs
            WHERE added_at >= $1 AND added_at < $2
        ) AS presence
        GROUP BY ${field}
        ORDER BY intensity DESC;
    `;
};

const apiCallsStatus = () => `
    SELECT a.status, count(a.status) 
    FROM public.api_logs as a
    WHERE a.added_at >= $1 AND a.added_at < $2
    GROUP BY a.status;
`;

const apiDownloaders = () => `
    SELECT DISTINCT d.user_id, d.operation_type
    FROM public.document_logs as d
    WHERE (
        d.operation_type = 'DDOC' 
        AND d.accessed_at >= $1 
        AND d.accessed_at < $2
    );
`;

const sandboxUsers = (mode: string) => {
  const queryMode = mode === "UN" ? "UNION" : "INTERSECT";

  return `
    SELECT DISTINCT d.user_id
    FROM public.document_logs as d
    WHERE (
        d.operation_type = 'DDOC' 
        AND d.accessed_at >= $1 
        AND d.accessed_at < $2
    )

    ${queryMode}

    SELECT DISTINCT a.user_id
    FROM public.api_logs as a
    WHERE (
        a.operation_type = 'IAPI' 
        AND a.added_at >= $1
        AND a.added_at < $2
    )
`;
};

export const QUERIES = {
  apiCalls,
  apiCallers,
  members,
  apiDownloads,
  apiDownloaders,
  sandboxUsers,
  memberGenders,
  memberLocations,
  developers,
  memberAges,
  apiCallsIntensity,
  apiCallsStatus
};

export default pool;
