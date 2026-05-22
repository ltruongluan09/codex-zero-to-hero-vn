# Microsoft Clarity

Lumi Labs supports Microsoft Clarity for private testing:

- session replay
- heatmaps
- clicks
- scrolling
- rage clicks

## Environment Variable

Set this in Vercel Project Settings -> Environment Variables:

```bash
VITE_CLARITY_PROJECT_ID=your_project_id
```

Use the Production environment, then redeploy.

## Privacy Guard

Clarity is loaded only in production builds.

The implementation also masks:

- form inputs
- textareas
- file inputs
- generated Caption AI results
- DocScan AI results and raw extracted text

This keeps private testing useful without recording sensitive user-provided text.
