# Test Content Security Policy and Security Headers
# This script tests the security headers on the Baby Skuse website

param(
    [string]$Url = ""
)

# URLs to test
$urls = @(
    "https://skuse.baby",
    "http://localhost:8787"
)

if ($Url -ne "") {
    $urls = @($Url)
}

function Test-SecurityHeaders {
    param([string]$Url)
    
    Write-Host "`n===============================================" -ForegroundColor Cyan
    Write-Host "Testing Security Headers for: $Url" -ForegroundColor Cyan
    Write-Host "===============================================" -ForegroundColor Cyan
    
    try {
        # Make HTTP request and get headers
        $response = Invoke-WebRequest -Uri $Url -Method Head -UseBasicParsing -TimeoutSec 10
        $headers = $response.Headers
        
        # Test Content Security Policy
        Write-Host "`nContent Security Policy (CSP):" -ForegroundColor Yellow
        if ($headers.ContainsKey("Content-Security-Policy")) {
            $csp = $headers["Content-Security-Policy"]
            Write-Host "✅ CSP Header Found" -ForegroundColor Green
            Write-Host "   Value: $csp" -ForegroundColor Gray
            
            # Check for security best practices
            $cspLower = $csp.ToLower()
            if ($cspLower.Contains("default-src 'none'")) {
                Write-Host "   ✅ default-src 'none' - Excellent security practice" -ForegroundColor Green
            } elseif ($cspLower.Contains("default-src 'self'")) {
                Write-Host "   ⚠️  default-src 'self' - Good but could be more restrictive" -ForegroundColor Yellow
            } else {
                Write-Host "   ⚠️  default-src not set to 'none' or 'self'" -ForegroundColor Yellow
            }
            
            if ($cspLower.Contains("object-src 'none'")) {
                Write-Host "   ✅ object-src 'none' - Prevents object/embed attacks" -ForegroundColor Green
            } else {
                Write-Host "   ❌ object-src 'none' missing - Security risk" -ForegroundColor Red
            }
            
            if ($cspLower.Contains("base-uri 'self'")) {
                Write-Host "   ✅ base-uri 'self' - Prevents base tag hijacking" -ForegroundColor Green
            } else {
                Write-Host "   ❌ base-uri 'self' missing - Security risk" -ForegroundColor Red
            }
            
            if ($cspLower.Contains("frame-ancestors 'none'")) {
                Write-Host "   ✅ frame-ancestors 'none' - Prevents clickjacking" -ForegroundColor Green
            } else {
                Write-Host "   ⚠️  frame-ancestors not set to 'none'" -ForegroundColor Yellow
            }
            
            if ($cspLower.Contains("unsafe-eval")) {
                Write-Host "   ❌ unsafe-eval found - Security risk" -ForegroundColor Red
            }
            
            if ($cspLower.Contains("unsafe-inline")) {
                Write-Host "   ⚠️  unsafe-inline found - Consider using nonces or hashes" -ForegroundColor Yellow
            }
        } else {
            Write-Host "❌ CSP Header Missing" -ForegroundColor Red
        }
        
        # Test other security headers
        Write-Host "`nOther Security Headers:" -ForegroundColor Yellow
        
        # X-Content-Type-Options
        if ($headers.ContainsKey("X-Content-Type-Options")) {
            $xcto = $headers["X-Content-Type-Options"]
            Write-Host "✅ X-Content-Type-Options: $xcto" -ForegroundColor Green
        } else {
            Write-Host "❌ X-Content-Type-Options Missing" -ForegroundColor Red
        }
        
        # X-Frame-Options
        if ($headers.ContainsKey("X-Frame-Options")) {
            $xfo = $headers["X-Frame-Options"]
            Write-Host "✅ X-Frame-Options: $xfo" -ForegroundColor Green
        } else {
            Write-Host "❌ X-Frame-Options Missing" -ForegroundColor Red
        }
        
        # X-XSS-Protection
        if ($headers.ContainsKey("X-XSS-Protection")) {
            $xxp = $headers["X-XSS-Protection"]
            Write-Host "✅ X-XSS-Protection: $xxp" -ForegroundColor Green
        } else {
            Write-Host "❌ X-XSS-Protection Missing" -ForegroundColor Red
        }
        
        # Referrer-Policy
        if ($headers.ContainsKey("Referrer-Policy")) {
            $rp = $headers["Referrer-Policy"]
            Write-Host "✅ Referrer-Policy: $rp" -ForegroundColor Green
        } else {
            Write-Host "❌ Referrer-Policy Missing" -ForegroundColor Red
        }
        
        # Permissions-Policy
        if ($headers.ContainsKey("Permissions-Policy")) {
            Write-Host "✅ Permissions-Policy: $($headers["Permissions-Policy"])" -ForegroundColor Green
        } else {
            Write-Host "❌ Permissions-Policy Missing" -ForegroundColor Red
        }
        
        # Strict-Transport-Security (HSTS)
        if ($headers.ContainsKey("Strict-Transport-Security")) {
            Write-Host "✅ Strict-Transport-Security: $($headers["Strict-Transport-Security"])" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Strict-Transport-Security Missing (only needed for HTTPS)" -ForegroundColor Yellow
        }
        
        # Calculate Security Score
        Write-Host "`nSecurity Score Summary:" -ForegroundColor Cyan
        $score = 0
        $total = 7
        
        if ($headers.ContainsKey("Content-Security-Policy")) { $score++ }
        if ($headers.ContainsKey("X-Content-Type-Options")) { $score++ }
        if ($headers.ContainsKey("X-Frame-Options")) { $score++ }
        if ($headers.ContainsKey("X-XSS-Protection")) { $score++ }
        if ($headers.ContainsKey("Referrer-Policy")) { $score++ }
        if ($headers.ContainsKey("Permissions-Policy")) { $score++ }
        if ($headers.ContainsKey("Strict-Transport-Security")) { $score++ }
        
        $percentage = [math]::Round(($score / $total) * 100, 1)
        
        Write-Host "Security Score: $score/$total ($percentage%)" -ForegroundColor $(if ($percentage -ge 90) { "Green" } elseif ($percentage -ge 70) { "Yellow" } else { "Red" })
        
        if ($percentage -ge 90) {
            Write-Host "Excellent security configuration!" -ForegroundColor Green
        } elseif ($percentage -ge 70) {
            Write-Host "Good security, but room for improvement" -ForegroundColor Yellow
        } else {
            Write-Host "Security needs immediate attention" -ForegroundColor Red
        }
        
    } catch {
        Write-Host "Error testing headers: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test each URL
foreach ($url in $urls) {
    Test-SecurityHeaders -Url $url
}

Write-Host "`nSecurity header test completed" -ForegroundColor Green
