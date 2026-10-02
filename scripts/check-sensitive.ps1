$ErrorActionPreference = 'Stop'

# Simple detector to avoid committing obvious secrets or real seeded client data.
$patterns = @(
  @{ Name = 'APP_PASSWORD_LEGACY literal'; Regex = 'APP_PASSWORD_LEGACY\s*=\s*(?:\x27adm\.2026\x27|"adm\.2026")' },
  @{ Name = 'adm.2026 hardcoded'; Regex = '(?:\x27adm\.2026\x27|"adm\.2026")' },
  @{ Name = 'passBPS literal value'; Regex = 'passBPS\s*[:=]\s*(?:\x27[^\x27]+\x27|"[^"]+")' },
  @{ Name = 'passGubUy literal value'; Regex = 'passGubUy\s*[:=]\s*(?:\x27[^\x27]+\x27|"[^"]+")' },
  @{ Name = 'passCjppu literal value'; Regex = 'passCjppu\s*[:=]\s*(?:\x27[^\x27]+\x27|"[^"]+")' },
  @{ Name = 'codGubUy literal value'; Regex = 'codGubUy\s*[:=]\s*(?:\x27[^\x27]+\x27|"[^"]+")' },
  @{ Name = 'INIT_CLIENTES seeded data'; Regex = 'const\s+INIT_CLIENTES\s*=\s*\[(?!\s*\])' },
  @{ Name = 'suspicious password field'; Regex = '(password|contrase(?:n|ñ)a|clave|pin)\s*[:=]\s*(?:\x27[A-Za-z0-9._@!#$%^&*+=-]{6,}\x27|"[A-Za-z0-9._@!#$%^&*+=-]{6,}")' },
  @{ Name = 'private key marker'; Regex = '-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----' },
  @{ Name = 'service account marker'; Regex = '"type"\s*:\s*"service_account"|private_key_id|client_secret|refresh_token' }
)

$files = git ls-files
if (-not $files) {
  Write-Host 'No tracked files found.'
  exit 0
}

$exclude = @(
  '.gitignore',
  'scripts/check-sensitive.ps1'
)

$hits = @()
foreach ($file in $files) {
  if ($exclude -contains $file) { continue }
  if (-not (Test-Path -LiteralPath $file)) { continue }

  foreach ($p in $patterns) {
    $foundMatches = Select-String -Path $file -Pattern $p.Regex -AllMatches -CaseSensitive:$false -Encoding UTF8 -ErrorAction SilentlyContinue
    foreach ($m in $foundMatches) {
      $hits += [pscustomobject]@{
        File = $file
        Line = $m.LineNumber
        Rule = $p.Name
      }
    }
  }
}

if ($hits.Count -eq 0) {
  Write-Host 'Sensitive check: clean.'
  exit 0
}

Write-Host 'Sensitive check: violations found.'
$hits | Sort-Object File, Line, Rule | ForEach-Object {
  Write-Host ("- {0}:{1} [{2}]" -f $_.File, $_.Line, $_.Rule)
}

exit 1
