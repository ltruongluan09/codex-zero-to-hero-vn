Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$assetDir = Join-Path $root "assets"

function New-Canvas($path, $title, $subtitle, $cards) {
    $w = 1400
    $h = 760
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $rectBg = New-Object System.Drawing.Rectangle 0, 0, $w, $h
    $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rectBg, ([System.Drawing.Color]::FromArgb(6,17,31)), ([System.Drawing.Color]::FromArgb(10,45,60)), 45
    $g.FillRectangle($bg, 0, 0, $w, $h)

    $fontTitle = New-Object System.Drawing.Font "Arial", 34, ([System.Drawing.FontStyle]::Bold)
    $fontSub = New-Object System.Drawing.Font "Arial", 20
    $fontCardTitle = New-Object System.Drawing.Font "Arial", 23, ([System.Drawing.FontStyle]::Bold)
    $fontText = New-Object System.Drawing.Font "Arial", 18
    $white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(235,252,255))
    $muted = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(145,185,195))
    $cyan = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(65,225,240), 3)
    $cardBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(210,16,42,58))

    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString($title, $fontTitle, $white, (New-Object System.Drawing.RectangleF 60,50,1280,50), $sf)
    $g.DrawString($subtitle, $fontSub, $muted, (New-Object System.Drawing.RectangleF 80,105,1240,36), $sf)

    foreach ($c in $cards) {
        $rect = New-Object System.Drawing.Rectangle $c.X, $c.Y, $c.W, $c.H
        $g.FillRectangle($cardBrush, $rect)
        $g.DrawRectangle($cyan, $rect)
        $g.DrawString($c.Title, $fontCardTitle, $white, (New-Object System.Drawing.RectangleF ($c.X+20),($c.Y+20),($c.W-40),36))
        $y = $c.Y + 74
        foreach ($line in $c.Lines) {
            $g.DrawString($line, $fontText, $muted, (New-Object System.Drawing.RectangleF ($c.X+24),$y,($c.W-48),28))
            $y += 38
        }
    }

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

$images = @(
    @{Name="00-before-vs-now-infographic.png"; Title="5 nam truoc vs hien tai"; Subtitle="Cach tao ung dung da thay doi"; Cards=@(
        @{X=90;Y=170;W=570;H=460;Title="TRUOC DAY";Lines=@("- Phai thue dev","- Phai hoc code","- Mat nhieu thang","- Ton nhieu tien","- Y tuong de bi ket lai")},
        @{X=740;Y=170;W=570;H=460;Title="HIEN TAI";Lines=@("- Mo ta y tuong","- AI ho tro build","- Tao app nhanh hon","- Deploy de hon","- Co demo that de thu")}
    )},
    @{Name="00-before-after-coding.png"; Title="Khong can bat dau bang code"; Subtitle="Bat dau bang van de that va prompt ro"; Cards=@(
        @{X=90;Y=180;W=570;H=430;Title="TRUOC";Lines=@("Man hinh day code","Nguoi moi de bi choang","Khong biet sua tu dau")},
        @{X=740;Y=180;W=570;H=430;Title="HIEN TAI";Lines=@("Nhap prompt tieng Viet","Codex tao ban dau","Ban mo app va kiem tra")}
    )},
    @{Name="00-codex-ai-engineer-flow.png"; Title="Codex nhu nhan vien ky thuat AI"; Subtitle="Ban mo ta, Codex build, ban kiem tra, Codex sua tiep"; Cards=@(
        @{X=160;Y=170;W=310;H=170;Title="1. Nguoi dung";Lines=@("CEO / HR / PM / BA")},
        @{X=545;Y=170;W=310;H=170;Title="2. Mo ta";Lines=@("Yeu cau bang tieng Viet")},
        @{X=930;Y=170;W=310;H=170;Title="3. Codex build";Lines=@("Tao app va sua file")},
        @{X=350;Y=430;W=310;H=170;Title="4. Kiem tra";Lines=@("Mo app, bam thu")},
        @{X=740;Y=430;W=310;H=170;Title="5. Sua tiep";Lines=@("Fix loi, polish UI")}
    )},
    @{Name="00-ceo-using-ai-build-app.png"; Title="CEO dung AI tao demo san pham"; Subtitle="Tu y tuong tren giay den MVP co the trinh bay"; Cards=@(
        @{X=120;Y=190;W=360;H=370;Title="Nguoi hieu bai toan";Lines=@("Biet khach hang","Biet muc tieu","Biet dieu can thu")},
        @{X=530;Y=190;W=360;H=370;Title="Prompt cho Codex";Lines=@("Mo ta san pham","Chon ban demo nho","Yeu cau UI ro")},
        @{X=940;Y=190;W=360;H=370;Title="Demo app";Lines=@("Co man hinh that","Co luong dung thu","Co link de chia se")}
    )},
    @{Name="00-landing-page-mockup.png"; Title="Landing page"; Subtitle="Website mot trang de gioi thieu dich vu hoac san pham"; Cards=@(
        @{X=120;Y=170;W=760;H=430;Title="Dich vu tu van tuyen dung";Lines=@("Hero ro rang","3 loi ich chinh","Quy trinh lam viec","Form dang ky tu van")},
        @{X=930;Y=170;W=330;H=430;Title="CTA";Lines=@("Dang ky tu van","Nhan bao gia","Gui thong tin")}
    )},
    @{Name="00-dashboard-mockup.png"; Title="Dashboard doanh thu thang"; Subtitle="Man hinh so lieu cho manager xem nhanh"; Cards=@(
        @{X=90;Y=170;W=280;H=160;Title="Doanh thu";Lines=@("1.2B VND")},
        @{X=405;Y=170;W=280;H=160;Title="So don";Lines=@("842 don")},
        @{X=720;Y=170;W=280;H=160;Title="KH moi";Lines=@("126 khach")},
        @{X=1035;Y=170;W=280;H=160;Title="Ty le chot";Lines=@("31%")},
        @{X=90;Y=390;W=760;H=240;Title="Bieu do doanh thu";Lines=@("Xu huong 30 ngay","So sanh theo tuan")},
        @{X=900;Y=390;W=415;H=240;Title="Top sales";Lines=@("An - 120% KPI","Binh - 105% KPI","Chi - 89% KPI")}
    )},
    @{Name="00-excel-helper-mockup.png"; Title="Excel Helper"; Subtitle="Upload file, loc du lieu, xuat bang tong hop"; Cards=@(
        @{X=120;Y=190;W=390;H=390;Title="Upload file";Lines=@("CSV / Excel","Keo tha file","Kiem tra du lieu")},
        @{X=570;Y=190;W=700;H=390;Title="Bang du lieu";Lines=@("Loc theo phong ban","Dem nhan vien","Xuat ket qua tong hop")}
    )},
    @{Name="00-chatbot-ai-mockup.png"; Title="Chatbot AI noi bo"; Subtitle="Hoi dap theo noi dung cong ty cung cap"; Cards=@(
        @{X=120;Y=180;W=340;H=420;Title="Chu de FAQ";Lines=@("Onboarding","Nghi phep","Bao hiem","Quy trinh noi bo")},
        @{X=520;Y=180;W=760;H=420;Title="Khung chat";Lines=@("Hoi: Nhan vien moi can giay to gi?","Tra loi theo du lieu co san","Khong biet thi noi chua co thong tin")}
    )},
    @{Name="00-codex-workflow-idea-to-deploy.png"; Title="Tu y tuong den link demo"; Subtitle="Workflow dung Codex cho nguoi moi"; Cards=@(
        @{X=80;Y=190;W=185;H=230;Title="Y tuong";Lines=@("Van de that")},
        @{X=300;Y=190;W=185;H=230;Title="Prompt";Lines=@("Mo ta ro")},
        @{X=520;Y=190;W=185;H=230;Title="Codex";Lines=@("Build app")},
        @{X=740;Y=190;W=185;H=230;Title="Test";Lines=@("Mo va bam")},
        @{X=960;Y=190;W=185;H=230;Title="Fix loi";Lines=@("Sua tung buoc")},
        @{X=1180;Y=190;W=185;H=230;Title="Deploy";Lines=@("Gui link")}
    )},
    @{Name="00-human-ai-product-loop.png"; Title="Con nguoi dan dat, Codex ho tro build"; Subtitle="Vong lap tao san pham bang AI"; Cards=@(
        @{X=130;Y=190;W=310;H=330;Title="Ban";Lines=@("Hieu van de","Biet nguoi dung","Kiem tra ket qua")},
        @{X=545;Y=190;W=310;H=330;Title="Codex";Lines=@("Build ban dau","Fix loi","Cai thien UI")},
        @{X=960;Y=190;W=310;H=330;Title="San pham";Lines=@("App demo","Tool noi bo","MVP de thu")}
    )}
)

foreach ($img in $images) {
    New-Canvas (Join-Path $assetDir $img.Name) $img.Title $img.Subtitle $img.Cards
}
