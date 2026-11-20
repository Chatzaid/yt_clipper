from manim import *
BG="#0B0F19"; GREEN="#10B981"; WHITE="#F9FAFB"; MUTED="#94A3B8"
class Scene5ROI(Scene):
    def construct(self):
        self.camera.background_color=BG
        eyebrow=Text("FIXREACH / REPAIR ECONOMICS",font_size=19,color=MUTED,weight=BOLD).to_edge(UP,buff=.55)
        title=Text("1 REPAIR MARGIN  >  MULTI-DAY AD SPEND",font_size=29,color=WHITE,weight=BOLD).scale_to_fit_width(7.25).next_to(eyebrow,DOWN,buff=.35)
        subtitle=Text("ONE COMPLETED JOB CAN OFFSET SEVERAL DAYS",font_size=17,color=GREEN,weight=BOLD).scale_to_fit_width(7.2).next_to(title,DOWN,buff=.25)
        baseline=Line(LEFT*3.35+DOWN*1.35,RIGHT*3.35+DOWN*1.35,color="#334155",stroke_width=3)
        heights=[.72,1.0,1.22,1.48,1.72,2.0]; bars=VGroup(); labels=VGroup()
        for index,height in enumerate(heights):
            x=(index-2.5)*1.08
            bar=Rectangle(width=.68,height=height,fill_color=GREEN,fill_opacity=.95,stroke_color=GREEN,stroke_width=1).move_to(RIGHT*x+DOWN*1.35+UP*(height/2))
            bars.add(bar); labels.add(Text(f"D{index+1}",font_size=16,color=MUTED,weight=BOLD).next_to(bar,DOWN,buff=.18))
        chart_label=Text("STEADY DAILY CAMPAIGN SPEND",font_size=18,color=WHITE,weight=BOLD).next_to(baseline,DOWN,buff=.5)
        disclaimer=Text("ILLUSTRATIVE ONLY • ACTUAL MARGINS AND AD COSTS VARY",font_size=13,color=MUTED).scale_to_fit_width(7.1).move_to(DOWN*3.65)
        self.play(Write(eyebrow),Write(title),FadeIn(subtitle),run_time=1.2)
        self.play(Create(baseline),LaggedStart(*[GrowFromEdge(bar,DOWN) for bar in bars],lag_ratio=.1),FadeIn(labels),FadeIn(chart_label),run_time=2.0)
        self.play(FadeIn(disclaimer),run_time=.3)
        self.wait(4.8)
